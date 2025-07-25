<script setup lang="ts">
import { ref, computed, watchEffect, watch, defineProps } from 'vue'
import { onMounted } from 'vue'
import InfoService from '@/services/InfoService'
import olympicInfo from '@/components/olympicInfo.vue'
import { type Country } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const countries = ref<Country[]>([])
const totalCountry = ref(0)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const allCountries = ref<Country[]>([])
const medalData = ref<Map<number, { totalGold: number; totalSilver: number; totalBronze: number }>>(
  new Map()
)

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

const userLimit = ref<number>(props.limit)
const limit = computed(() => userLimit.value || props.limit)
const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPage = Math.ceil(totalCountry.value / limit.value)
  return page.value < totalPage
})

const fetchCountries = async () => {
  try {
    const response = await InfoService.getCountries(limit.value, page.value)
    countries.value = response.data
    totalCountry.value = parseInt(response.headers['x-total-count'])
    calculateAndSortCountries()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

watch(() => props.page, fetchCountries, { immediate: true })

onMounted(fetchCountries)

watchEffect(() => {
  InfoService.getCountries(limit.value, page.value)
    .then((response) => {
      countries.value = []
      countries.value = response.data
      totalCountry.value = parseInt(response.headers['x-total-count'])
      console.log('Before sorting:', countries.value)
      countries.value.forEach((country) => {
        console.log(`Country: ${country.countryName}, Gold: ${country.gold}`)
      })
      console.log('After sorting:', countries.value)
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
})

const calculateAndSortCountries = () => {
  allCountries.value.forEach((country) => {})
  allCountries.value.sort((a, b) => b.gold - a.gold)
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}

const updateMedals = (data: {
  countryId: number
  totalGold: number
  totalSilver: number
  totalBronze: number
}) => {
  medalData.value.set(data.countryId, data)
}

const rankedCountries = computed(() => {
  return countries.value
    .map((country) => ({
      ...country,
      totalGold: medalData.value.get(country.id)?.totalGold || 0,
      totalSilver: medalData.value.get(country.id)?.totalSilver || 0,
      totalBronze: medalData.value.get(country.id)?.totalBronze || 0
    }))
    .sort((a, b) => {
      if (b.totalGold !== a.totalGold) {
        return b.totalGold - a.totalGold
      }
      if (b.totalSilver !== a.totalSilver) {
        return b.totalSilver - a.totalSilver
      }
      return b.totalBronze - a.totalBronze
    })
})
</script>

<template>
  <div class="wrapper">
    <nav class="navbar bg-black p-4 flex items-center justify-between w-full">
      <img
        src="@/assets/logo-2.png"
        alt="Logo"
        class="w-[120px] h-[120px] md:w-[150px] md:h-[150px] items-center"
      />

      <div class="flex-1 flex justify-end">
        <ul v-if="!authStore.currentUserName" class="flex navbar-nav text-white">
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
        <ul v-if="authStore.currentUserName" class="flex navbar-nav text-white space-x-4">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <div class="flex items-center">
                <span class="ml-3">{{ authStore.currentUserName }}</span>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link hover:cursor-pointer text-white" @click="logout">
              <div class="flex items-center">
                <span class="ml-3">LogOut</span>
              </div>
            </a>
          </li>
          <li v-if="authStore.isMasterAdmin" class="nav-item">
            <router-link to="/users" class="nav-link">
              <div class="flex items-center">
                <span class="ml-3">List Of Users</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex flex-col md:flex-col lg:flex-row">
      <div class="w-full lg:w-6/12 p-4 md:order-1 center-content">
        <p class="text-blue-900 text-3xl md:text-5xl mt-8 ml-5 text-center md:text-left">
          THE BEST OF PARIS <br />2024 OLYMPIC GAMES
        </p>
        <p
          class="text-gray-900 opacity-30 ml-5 mt-1 mb-1 text-xs md:text-lg text-center md:text-left"
        >
          The best moments, all in one place. Get unlimited <br />
          access to exclusive content, highlights, and replays of<br />
          the Paris 2024 Olympic Games.
        </p>

        <!-- Form to Input Number of Countries -->
        <div class="ml-5 mt-4 flex items-center space-x-2 md:space-x-4">
          <form class="flex items-center">
            <label for="countryLimit" class="mr-2 text-sm md:text-base"
              >Number of countries per page:</label
            >
            <input
              id="countryLimit"
              type="number"
              v-model.number="userLimit"
              class="px-2 py-1 border rounded mr-2 text-sm md:text-base"
              min="1"
              max="10"
              step="1"
              required
            />
          </form>
          <div class="flex items-center justify-end">
            <span v-if="authStore.isAdmin || authStore.isMasterAdmin">
              <RouterLink
                to="/add-data"
                class="inline-flex items-center px-3 py-1 bg-white text-black border border-black rounded-[30px] text-sm md:text-base"
              >
                + Add New Country
              </RouterLink>
            </span>
          </div>
        </div>

        <div class="block md:flex justify-start w-full overflow-x-auto mt-4">
          <table
            class="w-full max-w-screen-lg border-collapse bg-customBlue rounded-[30px] overflow-hidden"
          >
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
              <tr
                v-for="(country, index) in rankedCountries"
                :key="country.id"
                class="text-center odd:bg-white h-16"
              >
                <td>{{ (page - 1) * limit + index + 1 }}</td>
                <olympicInfo :country="country" @updateMedals="updateMedals" />
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 flex justify-between w-full">
          <div class="flex items-center">
            <RouterLink
              :to="{ name: 'home-view', query: { page: page - 1, limit: limit } }"
              rel="prev"
              v-if="props.page != 1"
              class="inline-block px-4 py-2 bg-red-500 text-white rounded-[30px]"
            >
              &#60; Prev Page
            </RouterLink>
          </div>
          <div class="flex items-center justify-end">
            <RouterLink
              :to="{ name: 'home-view', query: { page: page + 1, limit: limit } }"
              rel="next"
              v-if="hasNextPage"
              class="inline-block px-4 py-2 bg-red-500 text-white rounded-[30px]"
            >
              Next Page &#62;
            </RouterLink>
          </div>
        </div>
      </div>
      <!-- Right Column (Image) -->
      <div
        class="w-full md:w-6/12 flex items-center justify-center p-4 order-2 md:order-2 center-content"
      >
        <img
          src="@/assets/PeoSummerOlympics_2024.jpg"
          alt="Badminton"
          class="max-w-full h-auto rounded-lg opacity-80"
        />
      </div>
    </div>
    <div class="flex justify-center mt-4 space-x-4"></div>
  </div>
</template>
