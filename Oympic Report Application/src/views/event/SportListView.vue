<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Country } from '@/types'

const props = defineProps<{
  country: Country
}>()

const totalGold = computed(() => props.country.sports.reduce((sum, sport) => sum + sport.gold_medals, 0))
const totalSilver = computed(() => props.country.sports.reduce((sum, sport) => sum + sport.silver_medals, 0))
const totalBronze = computed(() => props.country.sports.reduce((sum, sport) => sum + sport.bronze_medals, 0))
</script>

<template>
  <div v-if="country.sports && country.sports.length > 0" class="flex justify-center items-center overflow-x-auto py-10 mt-4 px-4 sm:px-6">
    <table class="w-full max-w-screen-lg min-w-full sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] border-collapse bg-blue-100 rounded-[30px] overflow-hidden ">
      <thead class="border-b-2 border-gray-500">
        <tr class="text-center bg-customPurple text-white">
          <th class="Outfit px-4 py-2">Sport</th>
          <th class="px-4 py-2">
                  <div class="flex items-center justify-center h-full w-full">
                    <img src="@/assets/gold.png" class="w-[30px] h-[50px]" alt="Gold Medal">
                  </div>
                </th>
                <th class="px-4 py-2">
                  <div class="flex items-center justify-center h-full w-full">
                    <img src="@/assets/silver.png" class="w-[60px] h-[50px]" alt="Silver Medal">
                  </div>
                </th>
                <th class="px-4 py-2">
                  <div class="flex items-center justify-center h-full w-full">
                    <img src="@/assets/bronze.png" class="w-[60px] h-[50px]" alt="Bronze Medal">
                  </div>
                </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sport in country.sports" :key="sport.name" class="text-center odd:bg-white h-16">
          <td class="px-4 py-2">{{ sport.name }}</td>
          <td class="px-4 py-2">{{ sport.gold_medals }}</td>
          <td class="px-4 py-2">{{ sport.silver_medals }}</td>
          <td class="px-4 py-2">{{ sport.bronze_medals }}</td>
        </tr>
        <tr class="text-center bg-customPurple text-white h-16 border-t-2 border-gray-500">
          <td class="px-4 py-2 font-bold">Total</td>
          <td class="px-4 py-2 font-bold">{{ totalGold }}</td>
          <td class="px-4 py-2 font-bold">{{ totalSilver }}</td>
          <td class="px-4 py-2 font-bold">{{ totalBronze }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="mt-4">
    <p>No sports data available.</p>
  </div>
</template>



