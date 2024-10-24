<script setup lang="ts">
import { ref, computed, watchEffect, watch, defineProps } from 'vue'
import { onMounted } from 'vue'
import UserService from '@/services/UserService';
import { type Country, User} from '@/types'
import olympicInfo from '@/components/olympicInfo.vue'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';


const users = ref<User[] | null>(null)
const totalUser = ref(0)
const authStore = useAuthStore()
const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
});

const userLimit = ref<number>(props.limit);
const limit = computed(() => userLimit.value || props.limit);
const page = computed(() => props.page);

// function goToAddData() {
//   router.push({ name: 'add-data' }); 
// }

const hasNextPage = computed(() => {
  const totalPage = Math.ceil(totalUser.value / limit.value);
  return page.value < totalPage;
});

// Fetch users
watchEffect(() => {
  UserService.getUser()
    .then((response) => {
      users.value = response.data;
      totalUser.value = parseInt(response.headers['x-total-count']);
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
})

</script>
<template>
    <div>
      <h1 class="text-center mb-6 text-2xl font-bold">User List</h1>
      <table class="w-full max-w-screen-lg border-collapse bg-customBlue rounded-[30px] overflow-hidden">
        <thead class="border-b border-gray-500">
          <tr class="text-center bg-customPurple">
            <th class="Outfit px-4 py-2 text-white">ID</th>
            <th class="Outfit px-4 py-2 text-white">First Name</th>
            <th class="Outfit px-4 py-2 text-white">Last Name</th>
            <th class="Outfit px-4 py-2 text-white">Username</th>
            <th class="Outfit px-4 py-2 text-white">Email</th>
            <th class="Outfit px-4 py-2 text-white">Roles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="text-center odd:bg-white h-16">
            <td>{{ user.id }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roles?.join(', ') || 'No roles' }}</td>
          </tr>
        </tbody>
      </table>
      <RouterLink
              :to="{ name: 'home-view' }"
              rel="next"
              class="inline-block px-4 py-2 bg-red-500 text-white rounded-[30px]"
            >
            &#60; Back To Homepage
            </RouterLink>
    </div>
    
  </template>
  