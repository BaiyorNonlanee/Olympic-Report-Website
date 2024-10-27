<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()

const validationSchema = yup.object({
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const messageStore = useMessageStore()
const onSubmit = handleSubmit((values) => {
  authStore
    .login(values.email, values.password)
    .then(() => {
      router.push({ name: 'home-view' })
    })
    .catch(() => {
      messageStore.updateMessage('could not login')
      console.log(messageStore.message)
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})
</script>

<template>
  <div class="relative">
    <p
      v-if="messageStore.message"
      class="fixed top-0 left-0 w-full p-3 bg-yellow-300 text-black font-medium shadow-lg z-50 text-center"
    >
      {{ messageStore.message }}
    </p>

    <div class="flex flex-col lg:flex-row min-h-screen">
      <div
        class="w-full lg:w-1/2 bg-cover bg-center h-64 lg:h-auto"
        style="
          background-image: url('https://preview.redd.it/made-a-simple-vertical-wallpaper-v0-vvavjan34ffd1.png?auto=webp&s=459d645549db8224cebc3b9be89f393ba5e42896');
        "
      ></div>
      <div class="w-full lg:w-1/2 px-6 py-12 lg:px-8 mt-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            class="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-6 lg:mb-20"
          >
            Sign in to your account
          </h2>
        </div>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6 lg:space-y-12" @submit.prevent="onSubmit">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >Email Address</label
              >
              <InputText
                type="text"
                v-model="email"
                placeholder="Email address"
                class="block w-full rounded-md border-0 py-1.5 px-4 text-lg"
                :error="errors['email']"
              />
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</a
                  >
                </div>
              </div>
              <InputText
                type="password"
                v-model="password"
                placeholder="Password"
                class="block w-full rounded-md border-0 py-1.5 px-4"
                :error="errors['password']"
              />
            </div>

            <div>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            {{ ' ' }}
            <a
              href="/register"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >Try to register here</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
