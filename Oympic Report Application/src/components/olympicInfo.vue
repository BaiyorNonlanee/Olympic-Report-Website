<script setup lang="ts">
import { type Country } from '@/types'
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  country: Country
}>()
</script>

<template>
  <!-- Display a single row of table data -->
  <td>{{ country.rank }}</td>
  <td>
    <RouterLink
      class="text-black underline hover:text-blue-500 hover:underline"
      :to="{ name: 'country-detail-view', params: { id: country.id } }"
    >
      {{ country.country_name }}
    </RouterLink>
  </td>
  <td>{{ country.gold }}</td>
  <td>{{ country.silver }}</td>
  <td>{{ country.bronze }}</td>
</template>
<style scoped></style>
