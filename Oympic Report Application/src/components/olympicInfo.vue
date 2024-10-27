<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'; 
import type { Country } from '@/types';
import { RouterLink } from 'vue-router';
import SportListView from "@/views/event/SportListView.vue";

const props = defineProps<{
  country: Country;
}>();

const totalGold = ref(0);
const totalSilver = ref(0);
const totalBronze = ref(0);

// คำนวณยอดรวมเหรียญ
const calculateTotals = () => {
  totalGold.value = props.country.ownSports?.reduce((total, sport) => total + (sport.gold_medals || 0), 0) || 0;
  totalSilver.value = props.country.ownSports?.reduce((total, sport) => total + (sport.silver_medals || 0), 0) || 0;
  totalBronze.value = props.country.ownSports?.reduce((total, sport) => total + (sport.bronze_medals || 0), 0) || 0;
};

// เรียกใช้ calculateTotals เมื่อ props.country เปลี่ยนแปลง
watch(() => props.country, calculateTotals, { immediate: true });

</script>

<template>
  <td>
    <RouterLink
      class="text-black underline hover:text-blue-500 hover:underline"
      :to="{ name: 'country-detail-view', params: { id: country.id } }"
    >
      {{ country.countryName }}
    </RouterLink>
    <SportListView 
      :country="country" 
      :totalGold="totalGold" 
      :totalSilver="totalSilver" 
      :totalBronze="totalBronze" 
      @updateTotals="calculateTotals" 
      v-show="false" 
    />
  </td>
  <td>{{ totalGold }}</td>
  <td>{{ totalSilver }}</td>
  <td>{{ totalBronze }}</td>
</template>
