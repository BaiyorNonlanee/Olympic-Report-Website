<script setup lang="ts">

</script>

<template>
  <div>
    <router-view />

    <router-link to="/add-data">
    <button class="btn-add-data">Go to Add Data</button>
  </router-link>
  </div>

</template>
<style scoped>
.header {
  text-align: center;
  align-items: center;
}
</style>
