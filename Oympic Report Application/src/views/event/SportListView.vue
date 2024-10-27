<script setup lang="ts">
import { defineProps, ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import type { Country } from '@/types';
import SportService from '@/services/SportService';
import InputTextSport from '@/components/InputTextSport.vue';
import { useMessageStore } from '@/stores/message';

const router = useRouter();
const messageStore = useMessageStore();
const props = defineProps<{ country: Country }>();
const emit = defineEmits(['updateTotals', 'updateCountry']);
const isEditing = ref(false);
const editedSports = ref([...props.country.ownSports]);

// การคำนวณยอดรวมเหรียญ
const totalGold = computed(() =>
  editedSports.value.reduce((sum, sport) => sum + sport.gold_medals, 0)
);
const totalSilver = computed(() =>
  editedSports.value.reduce((sum, sport) => sum + sport.silver_medals, 0)
);
const totalBronze = computed(() =>
  editedSports.value.reduce((sum, sport) => sum + sport.bronze_medals, 0)
);

// Validation schema for sports fields
const sportsSchema = yup.object({
  gold_medals: yup.number()
    .required('Gold medals are required')
    .typeError('Gold medals must be a number')  // Error message for non-numeric input
    .min(0, 'Gold medals must be 0 or more'),
  silver_medals: yup.number()
    .required('Silver medals are required')
    .typeError('Silver medals must be a number')  // Error message for non-numeric input
    .min(0, 'Silver medals must be 0 or more'),
  bronze_medals: yup.number()
    .required('Bronze medals are required')
    .typeError('Bronze medals must be a number')  // Error message for non-numeric input
    .min(0, 'Bronze medals must be 0 or more'),
});

// Set up form validation
const { handleSubmit } = useForm({ validationSchema: sportsSchema });


// Emit the totals whenever they change
watchEffect(() => {
  emit('updateTotals', {
    totalGold: totalGold.value,
    totalSilver: totalSilver.value,
    totalBronze: totalBronze.value,
  });
});

// Toggle edit mode
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

// Handle form submission
const submitChanges = async () => {
  if (goldMedals.value === null || silverMedals.value === null || bronzeMedals.value === null) {
    messageStore.updateMessage('Please enter valid medal counts.');
    return; 
  }

  try {
    for (const sport of editedSports.value) {
      await SportService.updateSport(sport.id, sport);
    }
    isEditing.value = false;

    messageStore.updateMessage('Sports updated successfully!');
    
    setTimeout(() => {
      router.push({ name: 'home-view' });
    }, 1000);

    setTimeout(() => {
      messageStore.resetMessage(); 
    }, 3000);
  } catch (error) {
    console.error('Error updating sports:', error);
    messageStore.updateMessage('Error updating sports, please try again.');
  }
};

// Form fields with error handling
const { value: sportName, errorMessage: sportNameError } = useField('sportName');
const { value: goldMedals, errorMessage: goldMedalsError } = useField('gold_medals');
const { value: silverMedals, errorMessage: silverMedalsError } = useField('silver_medals');
const { value: bronzeMedals, errorMessage: bronzeMedalsError } = useField('bronze_medals');

</script>

<template>
  <div class="relative">
    <p
      v-if="messageStore.message"
      class="fixed top-0 left-0 w-full p-3 bg-green-500 text-black font-medium shadow-lg z-50 text-center"
    >
      {{ messageStore.message }}
    </p>
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
              <input v-model="sport.sportName" class="border-2 border-gray-400 p-2 rounded w-full sm:w-[180px]" />
              <span v-if="sportNameError">{{ sportNameError }}</span>
            </div>
            <div v-else>
              {{ sport.sportName }}
            </div>
          </td>
          <td class="px-2 py-2">
            <div v-if="isEditing">
              <InputTextSport v-model="sport.gold_medals" placeholder="Gold Medals" :error="goldMedalsError" />
            </div>
            <div v-else>
              {{ sport.gold_medals }}
            </div>
          </td>
          <td class="px-2 py-2">
            <div v-if="isEditing">
              <InputTextSport v-model="sport.silver_medals" placeholder="Silver Medals" :error="silverMedalsError" />
            </div>
            <div v-else>
              {{ sport.silver_medals }}
            </div>
          </td>
          <td class="px-2 py-2">
            <div v-if="isEditing">
              <InputTextSport v-model="sport.bronze_medals" placeholder="Bronze Medals" :error="bronzeMedalsError" />
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
</div>
</template>
