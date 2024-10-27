<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Country } from '@/types'

const props = defineProps<{
  country: Country
  id: String
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { country } = toRefs(props)
</script>

<template>
  <div class="container-fluid mt-10 mb-10">
    <div class="flex">
      <!-- Left Column -->
      <div class="w-6/12 p-4">
        <h2 class="text-center text-xs md:text-3xl">
          {{ country.countryName }}'s history at the Olympics
        </h2>
        <div class="flex flex-row flex-wrap justify-center">
          <img
            v-for="image in country.images"
            :key="image"
            :src="image"
            alt="Event image"
            class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
          />
        </div>
      </div>

      <!-- Right Column -->
      <div
        class="w-6/12 p-4 flex items-center justify-center bg-customGreen mr-5 rounded-lg text-center text-xs md:text-lg"
      >
        <p class="text-center">{{ country.description }}</p>
      </div>
    </div>
  </div>
</template>
