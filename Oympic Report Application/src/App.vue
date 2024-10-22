<script setup lang="ts">
import { useRouter } from 'vue-router';

// const router = useRouter();

// function goToAddData() {
//   router.push({ name: 'add-data' }); // เปลี่ยน 'add-data' ให้ตรงกับชื่อเส้นทางที่ใช้สำหรับหน้า add data
// }
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
