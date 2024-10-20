<script setup lang="ts">
import type { Country , Sport } from '@/types';
import { onMounted, ref } from 'vue';
import InfoService from '@/services/InfoService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import SportService from '@/services/SportService';
// import SportService from '@/services/SportService';
import BaseInput from '@/components/BaseInput.vue';
// import OrganizerService from '@/services/OrganizerService';
// import BaseSelect from '@/components/BaseSelect.vue';
// import ImageUpload from '@/components/ImageUpload.vue';

const country = ref<Country>({
  id: 0,
  countryName: '',
  description: '',
  image: '',
  gold: 0,
  silver: 0,
  bronze: 0,
  rankValue: 0,
  sports: [],
});
const router = useRouter();
const store = useMessageStore();

function saveCountry() {
  InfoService.saveCountry(country.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } });
      store.updateMessage('You are successfully adding a new event for ' + response.data.title);
      setTimeout(() => {
        store.resetMessage();
      }, 3000);
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}
const sports = ref<Sport[]>([])
onMounted(() => {
  SportService.getports()
  .then((response) => {
    sports.value = response.data
  })
  .catch(() => {
    router.push ({ name: 'network-error-view' })
  })
})
</script>
<template>
    <h1 class="text-center text-2xl font-bold mb-4 " style="margin-top: 5% ; margin-bottom: 2%;" >Update Information</h1>
    <div class="container mx-auto p-4">
      <form @submit.prevent="saveCountry" class="w-full h-auto bg-white p-6 rounded shadow-md">
        <div class="form-group mb-4 flex items-center">
          <label for="countryName" class="block mb-5 w-1/3">Country Name:</label>
          <BaseInput 
            v-model="country.countryName" 
            type="text" 
            id="countryName" 
            placeholder="Country Name" 
            class="w-1/3 border border-gray-300 rounded p-2 resize rounded-xl p-2"
            style="min-height: 40px; resize: vertical;"
          />
        </div>
  
        <div class="form-group mb-4 flex items-center">
          <label for="description" class="block mb-5 w-1/3">Description:</label>
          <BaseInput 
            v-model="country.description" 
            type="text" 
            id="description" 
            placeholder="Description" 
            class="w-2/3 border border-gray-300 rounded p-2 resize rounded-xl"
            style="min-height: 80px; resize: vertical;"
          />
        </div>
  
        <div class="form-group mb-4">
        <label class="block mb-5">Medals:</label>
        <div class="flex space-x-4">
          <div class="flex-1 flex items-center" style="margin-left: 10%;">
            <label for="gold" class="block mb-5 mr-2">Gold:</label>
            <BaseInput 
              v-model="country.gold" 
              type="text" 
              id="gold" 
              placeholder="Gold" 
              class="w-1/3 border border-gray-300 rounded p-2 rounded-xl"
            />
          </div>
          <div class="flex-1 flex items-center">
            <label for="silver" class="block mb-5 mr-2">Silver:</label>
            <BaseInput 
              v-model="country.silver" 
              type="text" 
              id="silver" 
              placeholder="Silver" 
              class="w-1/3 border border-gray-300 rounded p-2 rounded-xl"
            />
          </div>
          <div class="flex-1 flex items-center">
            <label for="bronze" class="block mb-5 mr-2">Bronze:</label>
            <BaseInput 
              v-model="country.bronze" 
              type="text" 
              id="bronze" 
              placeholder="Bronze" 
              class="w-1/3 border border-gray-300 rounded p-2 rounded-xl"
            />
          </div>
        </div>
      </div>
  
      <div class="form-group mb-4 flex items-center">
        <label for="sport" class="block mb-5 w-1/3">Sport:</label>
        <select 
            v-model="country.sports.id" 
            id="sport" 
            class="w-1/3 border border-gray-300 rounded-xl p-2 custom-dropdown"
        >
            <option v-for="sport in sports" :key="sport.id" :value="sport.id">
            {{ sport.name }}
            </option>
        </select>
        </div>
  
        <div class="form-group mb-4 flex items-center">
          <label for="image" class="block mb-5 w-1/3">Upload Image:</label>
          <input 
            type="file" 
            id="image" 
            class="w-2/3 border border-gray-300 rounded p-2 rounded-xl"
            @change="onFileChange"
          />
        </div>
  
        <button 
          class="submit-button w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition" 
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </template>
  
<style scoped>
.custom-dropdown {
  background-color: white; /* สีพื้นหลังปกติ */
  transition: background-color 0.3s ease; /* เพื่อให้การเปลี่ยนสีลื่นไหล */
}

.custom-dropdown:hover {
  background-color: #678eb4; /* สีที่กำหนดเมื่อ hover */
  color: rgb(0, 0, 0); /* สีข้อความเมื่อ hover */
}
</style>
