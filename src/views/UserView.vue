<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import UserService from '@/services/UserService'
import BaseSelectRole from '@/components/BaseSelectRole.vue'
import { useRouter, useRoute } from 'vue-router'
import type { Role, User } from '../types'
import { useMessageStore } from '@/stores/message'

const users = ref<User[] | null>(null)
const isEditing = ref(false)
const roleOptions = ref<Role[]>([])
const router = useRouter()
const userJson: any = localStorage.getItem('user')
const messageStore = useMessageStore()
const numberOfUsers = ref(0)
const totalPages = ref(0)
const route = useRoute()

const currentPage = ref<number>(parseInt(route.query.page as string) || 1)
const itemsPerPage = ref<number>(parseInt(route.query.itemsPerPage as string) || 4)
const hasNextPage = computed(() => currentPage.value < totalPages.value)
const hasPreviousPage = computed(() => currentPage.value > 1)

const fetchData = async (page: number, limit: number) => {
  try {
    const userResponse = await UserService.getUsers(limit, page)
    const rolesResponse = await UserService.getRoleUser()
    console.log('Roles response:', rolesResponse)

    const totalCount = parseInt(userResponse.headers['x-total-count'] || '0', 10)
    numberOfUsers.value = totalCount
    totalPages.value = Math.ceil(totalCount / limit)
    roleOptions.value = rolesResponse.data
      .filter((role: string) => role !== 'ROLE_MASTERADMIN')
      .map((role: any, index: number) => ({ id: index + 1, roles: role }))
    users.value = userResponse.data
      .filter((user: { roles: string | string[] }) => !user.roles.includes('ROLE_MASTERADMIN'))
      .map((user: { roles: string | any[] }) => {
        const currentRoleId =
          user.roles.length > 0
            ? roleOptions.value.find((roleOption) => roleOption.roles === user.roles[0])?.id
            : null

        return {
          ...user,
          selectedRole: currentRoleId
        }
      })
  } catch (error) {
    console.error('Error fetching users or roles:', error)
  }
}

function updateQueryParams() {
  router.push({
    path: '/users',
    query: {
      page: currentPage.value.toString(),
      itemsPerPage: itemsPerPage.value.toString()
    }
  })
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
    updateQueryParams()
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    updateQueryParams()
  }
}

const updateSelectedRole = async (userId: number, selectedRole: number) => {
  const user = users.value?.find((user) => user.id === userId)
  if (user) {
    user.role.id = selectedRole
    try {
      await submitChanges()
      messageStore.updateMessage('Role change successful, please log in again.')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    } catch (error) {
      console.error('Error updating role:', error)
      messageStore.updateMessage('Error updating role. Please try again.')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    }
  }
}

onMounted(() => {
  fetchData(currentPage.value, itemsPerPage.value)
})

watch(
  () => route.query,
  (newQuery) => {
    currentPage.value = parseInt(newQuery.page as string) || 1
    itemsPerPage.value = parseInt(newQuery.itemsPerPage as string) || 4
    fetchData(currentPage.value, itemsPerPage.value)
  }
)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const filteredRoleOptions = computed(() => {
  return roleOptions.value.filter((role) => role.id !== 1)
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
        console.log(selectedRoleName[0])

        return UserService.editUserRole(userId, user.id, selectedRoleName)
      })
    )
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
      <h1 class="text-center text-3xl font-bold mb-4" style="margin-top: 3%; color: #0d3b66">
        LIST OF USERS
      </h1>
      <div class="w-full flex justify-start mb-4">
        <RouterLink :to="{ name: 'home-view' }" class="text-gray-500 text-sm font-bold underline">
          BACK TO HOMEPAGE
        </RouterLink>
      </div>

      <div class="overflow-x-auto w-full">
        <table
          class="min-w-full table-auto border-collapse bg-blue-100 rounded-[30px] overflow-hidden"
        >
          <thead class="border-b-2 border-gray-500">
            <tr class="text-center bg-customPurple text-white">
              <th class="Outfit px-2 py-2 text-xs sm:text-base">ID</th>
              <th class="Outfit px-2 py-2 text-xs sm:text-base">First Name</th>
              <th class="Outfit px-2 py-2 text-xs sm:text-base">Last Name</th>
              <th class="Outfit px-2 py-2 text-xs sm:text-base">Username</th>
              <th class="Outfit px-2 py-2 text-xs sm:text-base">Email</th>
              <th class="Outfit px-2 py-2 text-xs sm:text-base">Roles</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="text-center odd:bg-white h-16">
              <td class="text-xs sm:text-base">{{ user.id }}</td>
              <td class="text-xs sm:text-base">{{ user.firstname }}</td>
              <td class="text-xs sm:text-base">{{ user.lastname }}</td>
              <td class="text-xs sm:text-base">{{ user.username }}</td>
              <td class="text-xs sm:text-base">{{ user.email }}</td>
              <td>
                <BaseSelectRole
                  v-model="user.selectedRole"
                  :options="roleOptions"
                  @onChange="updateSelectedRole(user.id, $event)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex w-full max-w-screen-lg justify-between mt-4">
        <div>
          <button
            v-if="hasPreviousPage"
            @click="prevPage"
            class="inline-block px-4 py-2 bg-red-500 text-white rounded-[30px] mr-2"
          >
            &#60; Prev Page
          </button>
        </div>
        <div>
          <button
            v-if="hasNextPage"
            @click="nextPage"
            class="inline-block px-4 py-2 bg-red-500 text-white rounded-[30px]"
          >
            Next Page &#62;
          </button>
        </div>
      </div>
    </div>
    <div v-else class="mt-4">
      <p>No users data available.</p>
    </div>
  </div>
</template>
