<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 class="text-4xl font-bold mb-4">Uh-oh!</h1>
    <h3 class="text-2xl mb-4">
      It looks like you're experiencing some network issues
      <br />
      <a href="#" @click="router.go(-1)" class="text-blue-500 hover:underline">click here</a> to try
      again
    </h3>
  </div>
</template>
