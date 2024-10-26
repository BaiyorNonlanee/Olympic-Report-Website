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
        <h2 class="text-center text-xs md:text-3xl">{{ country.countryName }}'s history at the Olympics</h2>
        <div class="flex justify-center mt-4">
          <router-link :to="{ name: 'country-detail-view', params: { id: country.id } }">
            <img class="rounded-lg" :src="country.images" />
          </router-link>

          <!-- <img class="rounded-lg" :src="country.image" /> -->
        </div>
      </div>

      <!-- Right Column -->
      <div
        class="w-6/12 p-4 flex items-center justify-center bg-customGreen mr-5 rounded-lg text-center text-xs md:text-lg">
        <p class="text-center">{{ country.description }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.country-image {
  width: 350px;
  height: 100px;
  object-fit: cover;
}

.description {
  flex: 1;
}
</style>