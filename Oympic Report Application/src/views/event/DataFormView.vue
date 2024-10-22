<script setup lang="ts">
import type { Country, Sport } from '@/types';
import { onMounted, ref } from 'vue';
import InfoService from '@/services/InfoService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import SportService from '@/services/SportService';
import BaseInput from '@/components/BaseInput.vue';
import ImageUpload from '@/components/ImageUpload.vue';

const country = ref<Country>({
  id: 0,
  countryName: '',
  description: '',
  image: [],
  gold: 0,
  silver: 0,
  bronze: 0,
  rankValue: 0,
  sports: {
    id: 0,
    name: '',
    gold_medals: 0,
    silver_medals: 0,
    bronze_medals: 0
  }
});
const router = useRouter();
const store = useMessageStore();

function saveCountry() {
  const token = localStorage.getItem('authToken'); // ดึง token จาก local storage
  if (!token) {
    console.error('No token found, please log in again.');
    return; // หรือจัดการอย่างอื่นตามที่ต้องการ
  }

  InfoService.saveCountry(country.value)
    .then((response) => {
      if (response.data && response.data.id) {
        // นำทางไปยังหน้าที่ต้องการหลังจากบันทึกสำเร็จ
        router.push({ name: 'new-page-name' }); // กำหนดชื่อเส้นทางของหน้าใหม่ที่คุณต้องการไป

        store.updateMessage('Successfully added a new country: ' + response.data.countryName);
        setTimeout(() => {
          store.resetMessage();
        }, 3000);
      } else {
        console.error('Invalid response:', response);
      }
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}

const sports = ref<Sport[]>([]);
onMounted(() => {
  SportService.getSports() 
    .then((response) => {
      sports.value = response.data;
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
});
</script>

<template>
  <nav class="navbar bg-black p-4 flex items-center justify-center">
    <img
      src="@/assets/logo-2.png"
      alt="Logo"
      class="w-[120px] h-[120px] md:w-[150px] md:h-[150px]"
    />
  </nav>

  <h1 class="text-center text-3xl font-bold mb-4" style="margin-top: 3%; color: #0d3b66;">Update Information</h1>

  <div class="container mx-auto p-4" style="background-color: beige;">
    <form 
      @submit.prevent="saveCountry" 
      class="w-full h-auto p-6 relative rounded-xl p-2">  <!-- ลบ class rounded ที่ซ้ำ -->
      
      <div class="form-group mb-4 flex items-center">
        <label for="countryName" class="block mb-5 w-1/3">Country Name:</label>
        <BaseInput 
          v-model="country.countryName" 
          type="text" 
          id="countryName" 
          placeholder="Country Name" 
          class="w-1/3 border border-gray-300 rounded p-2 resize rounded-xl"
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
            <img 
              src="@/assets/gold.png" 
              alt="Gold Medal" 
              class="w-6 h-10 mb-3 mr-3 ml-1">
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
            <img 
              src="@/assets/silver.png" 
              alt="Silver Medal" 
              class="w-12 h-10 mb-3">
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
            <img 
              src="@/assets/bronze.png" 
              alt="Bronze Medal" 
              class="w-12 h-10 mb-3">
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

      <div>
        <h3>Upload Image:</h3>
        <ImageUpload v-model="country.image" />
      </div>

      <button 
        class="submit-button w-full py-2 text-white bg-red-600 rounded hover:bg-red-700 transition rounded-xl" 
        style="margin-top: 2%;"  
        type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
</style>
