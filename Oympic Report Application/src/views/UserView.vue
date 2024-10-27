<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import UserService from '@/services/UserService'
import BaseSelectRole from '@/components/BaseSelectRole.vue'
import { useRouter } from 'vue-router'
import { Role } from '../types'
import { useMessageStore } from '@/stores/message'


const users = ref([])
const isEditing = ref(false)
const roleOptions = ref<Role[]>([]);
const router = useRouter()
const userJson: any = localStorage.getItem('user')
const messageStore = useMessageStore();


const fetchData = async () => {
  try {
    const userResponse = await UserService.getUser();
    const rolesResponse = await UserService.getRoleUser();
    console.log("Roles response:", rolesResponse);

    // Filter and transform role options, excluding MASTERADMIN
    roleOptions.value = rolesResponse.data
      .filter((role: string) => role !== "ROLE_MASTERADMIN")
      .map((role, index) => ({ id: index + 1, roles: role })); // Transform roles into the expected format

    // Initialize users, filtering out those with ROLE_MASTERADMIN
    users.value = userResponse.data
      .filter(user => !user.roles.includes("ROLE_MASTERADMIN")) // Remove users with MASTERADMIN role
      .map(user => {
        // Get the ID for the first available role that is not MASTERADMIN
        const currentRoleId = user.roles.length > 0
          ? roleOptions.value.find(roleOption => roleOption.roles === user.roles[0])?.id
          : null;

        return {
          ...user,
          selectedRole: currentRoleId // Set selectedRole to the current role's ID or null if no valid roles
        };
      });

    console.log("Filtered users:", users.value);
  } catch (error) {
    console.error('Error fetching users or roles:', error);
  }
};

const updateSelectedRole = async (userId: number, selectedRole: number) => {
  const user = users.value.find(user => user.id === userId);
  if (user) {
    user.selectedRole = selectedRole; // Update the user's selected role
    try {
      await submitChanges();
      messageStore.updateMessage('Role change successful, please log in again.');
      setTimeout(() => {
        messageStore.resetMessage(); // Clear message after a few seconds
      }, 3000);
    } catch (error) {
      console.error('Error updating role:', error);
      messageStore.updateMessage('Error updating role. Please try again.');
      setTimeout(() => {
        messageStore.resetMessage();
      }, 3000);
    }  }
};


onMounted(fetchData)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

// Computed property to filter out MASTERADMIN
const filteredRoleOptions = computed(() => {
  return roleOptions.value.filter((role) => role.id !== 1) // Exclude MASTERADMIN
})

const submitChanges = async () => {
  try {
    await Promise.all(
      users.value.map((user) => {
        const selectedRoleName = roleOptions.value.find(
          (role) => role.id === user.selectedRole
        )?.roles

        if (!selectedRoleName) {
          console.warn(`No role selected for user ${user.id}`)
          return Promise.resolve() 
        }

        console.log(user.selectedRole) 

        const users = JSON.parse(userJson)

        const userId = users.id
        console.log(selectedRoleName[0]);
        
        return UserService.editUserRole(userId, user.id, selectedRoleName)
        
      })
    )

    toggleEdit()
    await fetchData()
  } catch (error) {
    console.error('Error updating roles:', error)
  }
}
</script>

<template>
    <div class="relative">
    <p
      v-if="messageStore.message"
    
      class="fixed top-0 left-0 w-full p-3 bg-green-500 text-black font-medium shadow-lg z-50 text-center"
    >
      {{ messageStore.message }}
    </p>
  <div
    v-if="users && users.length > 0"
    class="flex flex-col justify-center items-center overflow-x-auto py-10 mt-4 px-4 sm:px-6"
  >
    <table
      class="w-full max-w-screen-lg table-auto border-collapse bg-blue-100 rounded-[30px] overflow-hidden"
    >
      <thead class="border-b-2 border-gray-500">
        <tr class="text-center bg-customPurple text-white">
          <th class="Outfit px-2 py-2">ID</th>
          <th class="Outfit px-2 py-2">First Name</th>
          <th class="Outfit px-2 py-2">Last Name</th>
          <th class="Outfit px-2 py-2">Username</th>
          <th class="Outfit px-2 py-2">Email</th>
          <th class="Outfit px-2 py-2">Roles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="text-center odd:bg-white h-16">
          <td>{{ user.id }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            
              
                <BaseSelectRole v-model="user.selectedRole" :options="roleOptions" @onChange="updateSelectedRole(user.id, $event)" />
              
             
            
          </td>
        </tr>
      </tbody>
    </table>
    <RouterLink
              :to="{ name: 'home-view'}"
              class="inline-block px-4 py-2 bg-red-500 text-white rounded-[30px]"
            >
              &#60; Back to Homepage
    </RouterLink>

  
  </div>
  <div v-else class="mt-4">
    <p>No users data available.</p>
  </div>
</div>
</template>
