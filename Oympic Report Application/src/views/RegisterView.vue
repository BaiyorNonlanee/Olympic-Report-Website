<script setup lang="ts">
import { useMessageStore } from '@/stores/message';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { Country } from '../../types';
import { useAuthStore } from '@/stores/auth';
import { toRefs, defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from '@/components/InputText.vue';
import ImageUpload from '@/components/ImageUpload.vue';

const messageStore = useMessageStore();
const authStore = useAuthStore();
const router = useRouter();
const store = useMessageStore();

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
const { value: images } = useField<File | null>('image');  // Add image field

const onSubmit = handleSubmit((values) => {
  authStore.register(values.firstname, values.lastname, values.username, values.email, values.password, values.image)
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

// Handle image upload and update the form's image field
const handleImageUpload = (uploadedImage: File) => {
  images.value = uploadedImage;
};
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 1g:px-8">
    <div class="text-center">
      <p>Register here</p>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">Firstname</label>
            <InputText type="text" v-model="firstname" placeholder="Firstname" :error="errors['firstname']" />
          </div>
          <div>
            <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Lastname</label>
            <InputText type="text" v-model="lastname" placeholder="Lastname" :error="errors['lastname']" />
          </div>
          <div>
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <InputText type="text" v-model="username" placeholder="Username" :error="errors['username']" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <InputText type="text" v-model="email" placeholder="Email address" :error="errors['email']" />
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <InputText type="password" v-model="password" placeholder="Password" :error="errors['password']" />
          </div>
          <div>
            <h3>Upload Image:</h3>
            <ImageUpload @upload="handleImageUpload" /> <!-- Bind the upload event to handler -->
          </div>
          <div>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded">Register Me!</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
