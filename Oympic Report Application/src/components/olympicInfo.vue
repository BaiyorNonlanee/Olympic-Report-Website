<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'; 
import { type Country } from '@/types';
import { RouterLink } from 'vue-router';
import SportListView from "@/views/event/SportListView.vue"
import SportService from '@/services/SportService';

const props = defineProps<{
  country: Country;
}>();


const totalGold = ref(0);
const totalSilver = ref(0);
const totalBronze = ref(0);

const updateTotals = (totals: { totalGold: number; totalSilver: number; totalBronze: number }) => {
  totalGold.value = totals.totalGold?totals.totalGold:0;
  totalSilver.value = totals.totalSilver?totals.totalSilver:0;
  totalBronze.value = totals.totalBronze?totals.totalBronze:0 ;

  console.log("aaaaaaaaa", totals);
  


  onMounted(() => {
    SportService.getSports()
        .then(response => {
            //sports.value = response.data;
        })
        .catch(error => {
            console.error("Error fetching sports data:", error);
        });
});
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

