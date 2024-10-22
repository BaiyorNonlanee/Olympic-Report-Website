<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToAddData() {
  router.push({ name: 'add-data' }); // เปลี่ยน 'add-data' ให้ตรงกับชื่อเส้นทางที่ใช้สำหรับหน้า add data
}
</script>

<template>
  <div>
    <router-view />
    <div class="flex justify-center mt-4 space-x-4"> <!-- เพิ่ม space-x-4 เพื่อเว้นระยะระหว่างปุ่ม -->
      <button
        @click="goToAddData"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
      >
        Add Data
      </button>
    </div>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  align-items: center;
}
</style>
