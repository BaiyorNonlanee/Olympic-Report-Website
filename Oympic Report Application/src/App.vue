<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  align-items: center;
}
</style>
