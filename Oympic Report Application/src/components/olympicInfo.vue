<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'; 
import type { Country } from '@/types';
import { RouterLink } from 'vue-router';
import SportListView from "@/views/event/SportListView.vue";
import InfoService from '@/services/InfoService';

const props = defineProps<{
  country: Country;
}>();

const totalGold = ref(0);
const totalSilver = ref(0);
const totalBronze = ref(0);
const sports = ref([]);

// Function to update totals when receiving event from child component
const updateTotals = (totals: { totalGold: number; totalSilver: number; totalBronze: number }) => {
  totalGold.value = totals.totalGold;
  totalSilver.value = totals.totalSilver;
  totalBronze.value = totals.totalBronze;
};


</script>

<template>
  <td>
    <RouterLink
      class="text-black underline hover:text-blue-500 hover:underline"
      :to="{ name: 'country-detail-view', params: { id: country.id } }"
    >
      {{ country.countryName }}
    </RouterLink>
    <SportListView :country="country" @updateTotals="updateTotals" v-show="false" />
  </td>
  <td>{{ totalGold }}</td>
  <td>{{ totalSilver }}</td>
  <td>{{ totalBronze }}</td>
</template>
