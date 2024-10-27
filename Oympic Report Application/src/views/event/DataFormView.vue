<script setup lang="ts">
import type { Country, Sport } from '@/types'
import { onMounted, ref, watch } from 'vue'
import InfoService from '@/services/InfoService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import SportService from '@/services/SportService'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import BaseSelect from '@/components/icons/BaseSelect.vue'
import { number } from 'yup'

const country = ref<Country>({
  id: 0,
  countryName: '',
  description: '',
  // image: [],
  // gold: 0,
  // silver: 0,
  // bronze: 0,
  // rankValue: 0,
  images: [],
  // roles: [] ,
  sport: {
    id: 0,
    sportName: '',
    gold_medals: 0,
    silver_medals: 0,
    bronze_medals: 0,
    // images: []
  },
})
const router = useRouter()
const store = useMessageStore()
const sportname = ref("")
const sportid = ref(0)

function saveCountry() {
  console.log('Saving event:', country.value) // Log the event data
   const jsonobj = 
    {
        "countryName": country.value.countryName,
        "description": country.value.description,
        "images": country.value.images,
        "ownSports": [
            {
                "id": sportid.value,
                "sportName": sportname.value,
                "gold_medals": country.value.sport.gold_medals,
                "silver_medals": country.value.sport.silver_medals,
                "bronze_medals": country.value.sport.bronze_medals
            }
        ]
    }

    watch(() => country.value.images, (newImages) => {
    console.log("Updated images:", newImages);
    });

    console.log(jsonobj);
    
   InfoService.saveCountry(jsonobj)
    .then((response) => {
      console.log('Country saved successfully:', response.data)
      router.push({ name: 'country-detail-view', params: { id: response.data.id } })
      store.updateMessage('You are successfully add a new country for ' + response.data.countryName)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch((error) => {
      console.error('Error saving event:', error)
      router.push({ name: 'network-error-view' })
    })
}

const sports = ref<Sport[]>([])

onMounted(() => {
  SportService.getSports()
    .then((response) => {
      sports.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})

// Method to handle the change event
const handleSportChange = (sportId: string | number) => {
  console.log('Selected Sport ID:', sportId);
  SportService.getSportById(Number(sportId))
  .then((response) => {
      console.log("Information: ", response.data);
      sportname.value = response.data.sportName
      sportid.value = response.data.id
      //sports.value = response.data
      console.log(response.data);
      
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
  
};
// New method to handle the back navigation
const goBack = () => {
  router.push({ name: 'home-view' }); // Adjust the route name if needed
};
</script>

<template>
   <div class="wrapper bg-gradient-to-r from-white via-blue-400 via-purple-200 to-pink-300 min-h-screen">
      <!-- Navbar with user authentication -->
    <nav class="navbar bg-black p-4 flex items-center justify-between">
        
        <!-- Center the logo -->
      <div class="flex-1 flex justify-center">
        <img
          src="@/assets/logo-2.png"
          alt="Logo"
          class="w-[120px] h-[120px] md:w-[150px] md:h-[150px]"
        />
      </div>
   </nav>
  <h1 class="text-center text-3xl font-bold mb-4" style="margin-top: 3%; color: #0d3b66">
    ADD NEW COUNTRY
  </h1>

  <div class="container mx-auto p-4">
    <form @submit.prevent="saveCountry" class="w-full h-auto p-6 relative rounded-xl p-2">
      <!-- ลบ class rounded ที่ซ้ำ -->

      <div class="form-group mb-4 flex items-center">
        <label for="countryName" class="block mb-5 w-1/3">Country Name:</label>
        <BaseInput
          v-model="country.countryName"
          type="text"
          id="countryName"
          placeholder="Country Name"
          class="w-1/3 border border-gray-300 rounded p-2 resize rounded-xl"
          style="min-height: 40px; resize: vertical"
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
          style="min-height: 80px; resize: vertical"
        />
      </div>

      <div class="form-group mb-4">
        <label class="block mb-5">Medals:</label>
        <div class="flex space-x-4">
          <div class="flex-1 flex items-center" style="margin-left: 10%">
            <label for="gold" class="block mb-5 mr-2">Gold:</label>
            <img src="@/assets/gold.png" alt="Gold Medal" class="w-6 h-10 mb-3 mr-3 ml-1" />
            <BaseInput
              v-model="country.sport.gold_medals"
              type="text"
              id="gold"
              placeholder="Gold"
              class="w-1/3 border border-gray-300 rounded p-2 rounded-xl"
            />
          </div>
          <div class="flex-1 flex items-center">
            <label for="silver" class="block mb-5 mr-2">Silver:</label>
            <img src="@/assets/silver.png" alt="Silver Medal" class="w-12 h-10 mb-3" />
            <BaseInput
              v-model="country.sport.silver_medals"
              type="text"
              id="silver"
              placeholder="Silver"
              class="w-1/3 border border-gray-300 rounded p-2 rounded-xl"
            />
          </div>
          <div class="flex-1 flex items-center">
            <label for="bronze" class="block mb-5 mr-2">Bronze:</label>
            <img src="@/assets/bronze.png" alt="Bronze Medal" class="w-12 h-10 mb-3" />
            <BaseInput
              v-model="country.sport.bronze_medals"
              type="text"
              id="bronze"
              placeholder="Bronze"
              class="w-1/3 border border-gray-300 rounded p-2 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div class="form-group mb-4 flex items-center">
        <!-- <label for="sport" class="block mb-5 w-1/3">Sport:</label> -->
        <BaseSelect v-model="country.sport.id" :options="sports" label="Sport" @onChange="handleSportChange"
        class="mb-0 ml-2"/>
      </div>

      <div>
        <h3>Upload Image:</h3>
        <ImageUpload v-model="country.images" />
      </div>
      
      <button
        class="submit-button w-full py-2 text-white bg-red-600 rounded hover:bg-red-700 transition rounded-xl"
        style="margin-top: 2%"
        type="submit"
      >
        Submit
      </button>
            <!-- Back Button -->
      <button
        class="back-button w-full py-2 text-white bg-blue-800 rounded hover:bg-blue-900 transition rounded-xl mt-4"
        @click="goBack"
      >
        Back
      </button>
    </form>
  </div>
</div>

</template>

<style scoped></style>
