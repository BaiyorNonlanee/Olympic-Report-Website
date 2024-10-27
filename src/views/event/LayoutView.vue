<script setup lang="ts">
import { useInfoStore } from '@/stores/country'
import { storeToRefs } from 'pinia'

const store = useInfoStore()
const { country } = storeToRefs(store)
</script>
<template>
  <div v-if="country">
    <div class="flex items-center justify-center">
      <img class="opacity-80" src="@/assets/new.jpeg" />
    </div>
    <div class="flex items-center justify-center mt-5">
      <nav class="text-sm md:text-xl">
        <router-link
          :to="{ name: 'home-view' }"
          class="mx-2 text-gray-800 underline hover:text-blue-500"
          >Home</router-link
        >
        |
        <router-link
          :to="{ name: 'country-detail-view' }"
          class="mx-2 text-gray-800 underline hover:text-blue-500"
          >Information</router-link
        >
        |
        <router-link
          :to="{ name: 'country-sportlist-view' }"
          class="mx-2 text-gray-800 underline hover:text-blue-500"
          >List of sports</router-link
        >
        |
        <router-link
          :to="{ name: 'country-cheerup-view' }"
          class="mx-2 text-gray-800 underline hover:text-blue-500"
          >Cheer up athletes</router-link
        >
      </nav>
    </div>
    <RouterView :country="country" />
  </div>
</template>

<style>
h1 {
  text-align: center;
}
.logo img {
  width: 100px;
  height: auto;
}
</style>
