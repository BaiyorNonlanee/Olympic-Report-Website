<script setup lang="ts">
import { ref, computed, watchEffect, defineProps } from 'vue';
import InfoService from '@/services/InfoService';
import olympicInfo from '@/components/olympicInfo.vue';
import { type Country } from '@/types';

const countries = ref<Country[] | null>(null);
const totalCountry = ref(0);

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
      console.error('Error fetching data:', error);
    });
});

// Function to sort countries based on gold medals
const sortCountries = () => {
  if (countries.value) {
    countries.value.sort((a, b) => {
      const aGold = a.ownSports.reduce((sum, sport) => sum + sport.gold_medals, 0);
      const bGold = b.ownSports.reduce((sum, sport) => sum + sport.gold_medals, 0);
      return bGold - aGold; // Sort in descending order
    });
  }
};

// Watch for updates in countries to sort them
watchEffect(() => {
  if (countries.value) {
    sortCountries();
  }
});
</script>

<template>
  <div class="container-fluid">
    <nav class="navbar bg-black p-4 flex items-center justify-center">
      <img src="@/assets/logo-2.png" alt="Logo" class="w-[120px] h-[120px] md:w-[150px] md:h-[150px]" />
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
</template>
