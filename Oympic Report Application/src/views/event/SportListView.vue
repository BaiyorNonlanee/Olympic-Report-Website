<script setup lang="ts">
import { defineProps, ref, computed, defineEmits, watchEffect } from 'vue'
import type { Country, Sport } from '@/types'
import SportService from '@/services/SportService';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  country: Country
}>()




const emit = defineEmits(['updateTotals', 'updateCountry']);

const isEditing = ref(false);
const editedSports = ref([...props.country.ownSports]);

const totalGold = computed(() =>
  editedSports.value.reduce((sum, sport) => sum + sport.gold_medals, 0)
);
const totalSilver = computed(() =>
  editedSports.value.reduce((sum, sport) => sum + sport.silver_medals, 0)
);
const totalBronze = computed(() =>
  editedSports.value.reduce((sum, sport) => sum + sport.bronze_medals, 0)
);

// Emit the totals whenever they change
watchEffect(() => {
  emit('updateTotals', {
    totalGold: totalGold.value,
    totalSilver: totalSilver.value,
    totalBronze: totalBronze.value,
  });
});

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

;
// const submitChanges = () => {
//   emit('updateCountry', editedSports.value);
//   isEditing.value = false; 
// };


const submitChanges = async () => {
  try {
    for (const sport of editedSports.value) {
      const response = await SportService.updateSport(sport.id, sport) 
      console.log('Sport updated:', response.data);
    }
    emit('updateCountry', editedSports.value); 
    // emit('updateTotals', { totalGold, totalSilver, totalBronze });
    
    isEditing.value = false; 
    router.push({ name: 'home-view' });

  } catch (error) {
    console.error('Error updating sports:', error);
  }
};



</script>

<template>
  <div v-if="country.ownSports && country.ownSports.length > 0" class="flex flex-col justify-center items-center overflow-x-auto py-10 mt-4 px-4 sm:px-6">
    <table class="w-full max-w-screen-lg table-auto border-collapse bg-blue-100 rounded-[30px] overflow-hidden">
      <thead class="border-b-2 border-gray-500">
  <tr class="text-center bg-customPurple text-white">
    <th class="Outfit px-2 py-2">Sport</th>
    <th class="px-2 py-2">
      <div class="flex items-center justify-center h-full w-full">
        <img src="@/assets/gold.png" class="h-[50px] w-auto" alt="Gold Medal">
      </div>
    </th>
    <th class="px-2 py-2">
      <div class="flex items-center justify-center h-full w-full">
        <img src="@/assets/silver.png" class="h-[50px] w-auto" alt="Silver Medal">
      </div>
    </th>
    <th class="px-2 py-2">
      <div class="flex items-center justify-center h-full w-full">
        <img src="@/assets/bronze.png" class="h-[50px] w-auto" alt="Bronze Medal">
      </div>
    </th>
  </tr>
</thead>

      <tbody>
        <tr v-for="(sport, index) in editedSports" :key="sport.id" class="text-center odd:bg-white h-16">
          <td class="px-2 py-2">
            <div v-if="isEditing">
              <input v-model="sport.id" class="border-2 border-gray-400 p-2 rounded-lg w-full sm:w-[180px]" />
            </div>
            <div v-else class=" text-black">
              {{ sport.sportName }}
            </div>
          </td>
          <td class="px-2 py-2">
            <div v-if="isEditing">
              <input v-model.number="sport.gold_medals" type="number" class="border-2 border-gray-400 p-2 rounded w-full sm:w-[100px]" />
            </div>
            <div v-else>
              {{ sport.gold_medals }}
            </div>
          </td>
          <td class="px-2 py-2">
            <div v-if="isEditing">
              <input v-model.number="sport.silver_medals" type="number" class="border-2 border-gray-400 p-2 rounded w-full sm:w-[100px]" />
            </div>
            <div v-else>
              {{ sport.silver_medals }}
            </div>
          </td>
          <td class="px-2 py-2">
            <div v-if="isEditing">
              <input v-model.number="sport.bronze_medals" type="number" class="border-2 border-gray-400 p-2 rounded w-full sm:w-[100px]" />
            </div>
            <div v-else>
              {{ sport.bronze_medals }}
            </div>
          </td>
        </tr>
        <tr class="text-center bg-customPurple text-white h-16 border-t-2 border-gray-500">
          <td class="px-4 py-2 font-bold">Total</td>
          <td class="px-4 py-2 font-bold">{{ totalGold }}</td>
          <td class="px-4 py-2 font-bold">{{ totalSilver }}</td>
          <td class="px-4 py-2 font-bold">{{ totalBronze }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Buttons for editing and submitting -->
    <div class="mt-4 flex justify-end w-full max-w-screen-lg">
      <button v-if="!isEditing" @click="toggleEdit" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full">Edit</button>
      <button v-if="isEditing" @click="submitChanges" class="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full">Submit</button>
    </div>
  </div>
  <div v-else class="mt-4">
    <p>No sports data available.</p>
  </div>
</template>


