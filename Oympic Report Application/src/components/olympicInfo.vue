<!-- olympicInfo.vue -->
<script setup lang="ts">
import { ref, defineProps, watch, computed } from 'vue';
import type { Country } from '@/types';
import { RouterLink } from 'vue-router';
import SportListView from "@/views/event/SportListView.vue";

// Define props and emit
const props = defineProps<{
  country: Country;
}>();
const emit = defineEmits(['updateMedals']);

// Calculate total medals
const totalGold = computed(() => props.country.ownSports?.reduce((total, sport) => total + (sport.gold_medals || 0), 0) || 0);
const totalSilver = computed(() => props.country.ownSports?.reduce((total, sport) => total + (sport.silver_medals || 0), 0) || 0);
const totalBronze = computed(() => props.country.ownSports?.reduce((total, sport) => total + (sport.bronze_medals || 0), 0) || 0);

// Emit the medal totals when they change
watch([totalGold, totalSilver, totalBronze], () => {
  emit('updateMedals', {
    countryId: props.country.id,
    totalGold: totalGold.value,
    totalSilver: totalSilver.value,
    totalBronze: totalBronze.value,
  });
}, { immediate: true });

</script>

<template>
  <td>
    <RouterLink
      class="text-black underline hover:text-blue-500 hover:underline"
      :to="{ name: 'country-detail-view', params: { id: props.country.id } }"
    >
      {{ props.country.countryName }}
    </RouterLink>
    <SportListView 
      :country="props.country" 
      :totalGold="totalGold" 
      :totalSilver="totalSilver" 
      :totalBronze="totalBronze"
      v-show="false" 
    />
  </td>
  <td>{{ totalGold }}</td>
  <td>{{ totalSilver }}</td>
  <td>{{ totalBronze }}</td>
</template>
