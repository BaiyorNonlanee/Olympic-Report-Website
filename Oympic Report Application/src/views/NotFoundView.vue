<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page'
  }
)
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 class="text-4xl font-bold mb-4">Opps!</h1>
    <h3 class="text-2xl mb-4">The {{ resource }} you're looking for is not here.</h3>
    <RouterLink :to="{ name: 'home-view' }" class="text-blue-500 hover:underline">Back to home page</RouterLink>
  </div>
</template>
