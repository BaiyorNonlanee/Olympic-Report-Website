<script setup lang="ts">
import { ref, computed, watchEffect, watch, defineProps } from 'vue'
import { onMounted } from 'vue'
import InfoService from '@/services/InfoService';
import olympicInfo from '@/components/olympicInfo.vue'
import { type Country } from '@/types'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
import { mdiLogout } from '@mdi/js';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const countries = ref<Country[] | null>(null)
const totalCountry = ref(0)
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

function goToAddData() {
  router.push({ name: 'add-data' }); 
}

const hasNextPage = computed(() => {
  const totalPage = Math.ceil(totalCountry.value / limit.value);
  return page.value < totalPage;
});

// Fetch countries
watchEffect(() => {
  InfoService.getCountries(limit.value, page.value)
    .then((response) => {
      countries.value = response.data;
      totalCountry.value = parseInt(response.headers['x-total-count']);
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
})

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if(token && user){
  authStore.reload(token, JSON.parse(user))
}else{
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({name: 'login'})
}
</script>

<template>
  <div class="wrapper">
    <!-- Navbar with user authentication -->
    <nav class="navbar bg-black p-4 flex items-center justify-between">
      
      <!-- Center the logo -->
  <div class="flex-1 flex justify-center">
    <img
      src="@/assets/logo-2.png"
      alt="Logo"
      class="w-[120px] h-[120px] md:w-[150px] md:h-[150px]"
    />
  </div>
      
      <!-- User Authentication Links -->
      <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto text-white">
        <li class="nav-item px-2">
          <router-link to="/register" class="nav-link">
            <div class="flex items-center">
              <span class="ml-3">Sign Up</span>
            </div>
          </router-link>
        </li>
        <li class="nav-item px-2">
          <router-link to="/login" class="nav-link">
            <div class="flex items-center">
              <span class="ml-3">Login</span>
            </div>
          </router-link>
        </li>
      </ul>
      <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto  text-white">
        <li class="nav-item px-2">
          <router-link to="/profile" class="nav-link">
            <div class="flex items-center">
              <span class="ml-3">{{ authStore.currentUserName }}</span>
            </div>
          </router-link>
        </li>
        <li class="nav-item px-2">
          <a class="nav-link hover:cursor-pointer text-white" @click="logout">
            <div class="flex items-center">
              <span class="ml-3">LogOut</span>
            </div>
          </a>
        </li>
      </ul>
    </nav>
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-6/12 p-4 order-2 md:order-1">
        <p class="text-blue-900 text-3xl md:text-5xl mt-8 ml-5 text-center md:text-left">THE BEST OF PARIS <br />2024 OLYMPIC GAMES</p>
        
        <div class="block md:flex justify-start w-full overflow-x-auto mt-4">
          <table class="w-full max-w-screen-lg border-collapse bg-customBlue rounded-[30px] overflow-hidden">
            <thead class="border-b border-gray-500">
              <tr class="text-center bg-customPurple">
                <th class="Outfit px-4 py-2 text-white">Rank</th>
                <th class="px-4 py-2 text-white">Country</th>
                <th class="px-4 py-2">
                  <div class="flex items-center justify-center h-full w-full">
                    <img src="@/assets/gold.png" class="w-[30px] h-[50px]" alt="Gold Medal" />
                  </div>
                </th>
                <th class="px-4 py-2">
                  <div class="flex items-center justify-center h-full w-full">
                    <img src="@/assets/silver.png" class="w-[60px] h-[50px]" alt="Silver Medal" />
                  </div>
                </th>
                <th class="px-4 py-2">
                  <div class="flex items-center justify-center h-full w-full">
                    <img src="@/assets/bronze.png" class="w-[60px] h-[50px]" alt="Bronze Medal" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(country, index) in countries" :key="index" class="text-center odd:bg-white h-16">
                <td>{{ index + 1 }}</td>
                <olympicInfo :country="country" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-4 space-x-4"> <!-- เพิ่ม space-x-4 เพื่อเว้นระยะระหว่างปุ่ม -->
      <button
        @click="goToAddData"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
      >
        Add Data
      </button>
    </div>
</template>
