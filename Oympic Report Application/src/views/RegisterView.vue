<script setup lang="ts">
import { useMessageStore } from '@/stores/message';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
// import { Country } from '../../types';
import { useAuthStore } from '@/stores/auth';
import { toRefs, defineProps, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import InputText from '@/components/InputText.vue';
import ImageUpload from '@/components/ImageUpload.vue';
import logo from '@/assets/Logo.png';
import axios from 'axios';
import type { RegisterUser } from '@/types';

const registeruser = ref<RegisterUser> ({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  images: []
})

const messageStore = useMessageStore();
const authStore = useAuthStore();
const router = useRouter();
const store = useMessageStore();
//new
// const profilePicture = ref<File | null>(null);

const validationSchema = yup.object({
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    images: []  // Add image field here
  }
});

const { value: firstname } = useField<string>('firstname');
const { value: lastname } = useField<string>('lastname');
const { value: username } = useField<string>('username');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: images } = useField<string[]>('images');  // Add image field

const onSubmit = handleSubmit((values) => {
  authStore.register(values.firstname, values.lastname, values.username, values.email, values.password, values.images)
    .then(() => {
      router.push({ name: 'home-view' });
    }).catch(() => {
      messageStore.updateMessage('could not register');
      setTimeout(() => {
        messageStore.resetMessage();
      }, 3000);
    });
  console.log(values);
});
// watch(() => registeruser.value.images, (newImages) => {
//     console.log("Updated images:", newImages);
//     });
</script>
<template>
  <div class="relative bg-gradient-to-r from-white via-blue-400 via-purple-200 to-pink-300 min-h-screen">
    <div class="relative">
      <img :src="logo" alt="Logo" class="absolute top-0 left-0 w-20 h-20"/>
    </div>
    <div class="min-h-full justify-center px-6 py-12">
      <h1 class="text-2xl font-bold text-center mb-6">Register here</h1>
      <div class="w-full max-w-4xl flex">
        <!-- Left side: Form fields -->
        <div class="w-3/4 p-4 ml-4"> <!-- Added ml-4 for margin-left -->
          <form class="space-y-4" @submit.prevent="onSubmit">
            <div>
              <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">Firstname</label>
              <InputText type="text" v-model="firstname" placeholder="Firstname" 
                :error="errors['firstname']" class="w-full p-2 text-base border rounded-md"/>
            </div>
            <div>
              <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Lastname</label>
              <InputText type="text" v-model="lastname" placeholder="Lastname" 
                :error="errors['lastname']" class="w-full p-2 text-base border rounded-md"/>
            </div>
            <div>
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <InputText type="text" v-model="username" placeholder="Username" 
                :error="errors['username']" class="w-full p-2 text-base border rounded-md"/>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <InputText type="text" v-model="email" placeholder="Email address" 
                :error="errors['email']" class="w-full p-2 text-base border rounded-md"/>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <InputText type="password" v-model="password" placeholder="Password" 
                :error="errors['password']" class="w-full p-2 text-base border rounded-md"/>
            </div>
            <div>
              <button type="submit" class="w-full py-2 px-4 text-white bg-red-600 hover:bg-red-700 transition rounded-xl">
                Register Me!
              </button>
            </div>
          </form>
        </div>

        <!-- Right side: Image upload -->
        <div class="w-1/4 p-4 border-l border-gray-300 ml-15">
          <h3 class="text-xl font-bold mb-4">Upload Image:</h3>
          <ImageUpload v-model="images" />
          <div class="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-md">
            <h2 class="text-lg font-semibold mb-2">Preview</h2>
            <p><strong>ImageUrl: {{ images }}</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
