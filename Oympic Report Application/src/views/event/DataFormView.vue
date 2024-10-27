<script setup lang="ts">
import type { Country, Sport } from '@/types'
import { onMounted, ref, watch } from 'vue'
import InfoService from '@/services/InfoService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import SportService from '@/services/SportService'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const country = ref<Country>({
  id: 0,
  countryName: '',
  description: '',
  image: [],
  gold: 0,
  silver: 0,
  bronze: 0,
  rankValue: 0,
  images: [],
  roles: [] ,
  sport: {
    id: 0,
    sportName: '',
    gold_medals: 0,
    silver_medals: 0,
    bronze_medals: 0,
    images: []
  }
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
        "image": "",
        "ownSports": [
            {
                "id": sportid.value,
                "sportName": sportname.value,
                "gold_medals": country.value.gold,
                "silver_medals": country.value.silver,
                "bronze_medals": country.value.bronze
            }
        ]
    }
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

const schema = yup.object({
  countryName: yup.string().required('Country name is required'),
  description: yup.string(),
  gold: yup.number().min(0, 'Gold must be a positive number').nullable(),
  silver: yup.number().min(0, 'Silver must be a positive number').nullable(),
  bronze: yup.number().min(0, 'Bronze must be a positive number').nullable(),
  sport: yup.object({
    id: yup.number().min(1, 'Please select a sport').nullable()
  })
});
const { handleSubmit, errors } = useForm({ validationSchema: schema });

const { value: countryName, errorMessage: countryNameError } = useField<string>('countryName');

watch(countryName, (newValue) => {
  country.value.countryName = newValue ;
});

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
      sportname.value = response.data.sportName
      sportid.value = response.data.id
      //sports.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
  
};
const onSubmit = handleSubmit((values) => {
  saveCountry(); 
});
</script>

<template>
  
  <h1 class="text-center text-3xl font-bold mb-4" style="margin-top: 3%; color: #0d3b66">
    ADD NEW COUNTRY
  </h1>
  <div class="relative">
    <p
      v-if="store.message"
    
      class="fixed top-0 left-0 w-full p-3 bg-green-500 text-black font-medium shadow-lg z-50 text-center"
    >
      {{ store.message }}
    </p>
  <div class="container mx-auto p-4 rounded-xl" style="background-color: beige">
    <form @submit.prevent="onSubmit" class="w-full h-auto p-6 relative rounded-xl">
      <div class="form-group mb-4 flex flex-col md:flex-row items-start">
        <label for="countryName" class="block mb-2 md:mb-0 md:w-1/3">Country Name:</label>
        <BaseInput
          v-model="countryName"
          type="text"
          id="countryName"
          placeholder="Country Name"
          class="md:w-1/3 w-full border border-gray-300 rounded-xl p-2"
          style="min-height: 40px; resize: vertical"
        />
        <span class="text-red-600">{{ countryNameError }}</span>
      </div>

      <div class="form-group mb-4 flex flex-col md:flex-row items-start">
        <label for="description" class="block mb-2 md:mb-0 md:w-1/3">Description:</label>
        <BaseInput
          v-model="country.description"
          type="text"
          id="description"
          placeholder="Description"
          class="md:w-2/3 w-full border border-gray-300 rounded-xl p-2"
          style="min-height: 80px; resize: vertical"
        />
      </div>

      <div class="form-group mb-4">
        <label class="block mb-5">Medals:</label>
        <div class="flex flex-col md:flex-row space-x-0 md:space-x-4">
          <div class="flex-1 flex items-center">
            <label for="gold" class="block mb-5 mr-2">Gold:</label>
            <img src="@/assets/gold.png" alt="Gold Medal" class="w-6 h-10 mb-3 mr-3" />
            <BaseInput
              v-model="country.gold"
              type="text"
              id="gold"
              placeholder="Gold"
              class="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>
          <div class="flex-1 flex items-center">
            <label for="silver" class="block mb-5 mr-2">Silver:</label>
            <img src="@/assets/silver.png" alt="Silver Medal" class="w-12 h-10 mb-3" />
            <BaseInput
              v-model="country.silver"
              type="text"
              id="silver"
              placeholder="Silver"
              class="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>
          <div class="flex-1 flex items-center">
            <label for="bronze" class="block mb-5 mr-2">Bronze:</label>
            <img src="@/assets/bronze.png" alt="Bronze Medal" class="w-12 h-10 mb-3" />
            <BaseInput
              v-model="country.bronze"
              type="text"
              id="bronze"
              placeholder="Bronze"
              class="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>
        </div>
      </div>

      <div class="form-group mb-4 flex flex-col md:flex-row items-start">
        <label for="sport" class="block mb-2 md:mb-0 md:w-1/3">Sport:</label>
        <BaseSelect
          v-model="country.sport.id"
          :options="sports"
          @onChange="handleSportChange"
          class="w-full md:w-min h-10 text-lg border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <h3>Upload Image:</h3>
        <ImageUpload v-model="country.images" />
      </div>

      <button
        class="submit-button w-full py-2 text-white bg-red-600 rounded-xl hover:bg-red-700 transition"
        style="margin-top: 2%"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</div>
</template>


<style scoped></style>

