<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { Country } from '../../types'
import { useAuthStore } from '@/stores/auth'
import { toRefs, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '@/components/InputText.vue'

const messageStore = useMessageStore()
const authStore = useAuthStore()
const router = useRouter()

const validationSchema = yup.object({
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().required('The email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('The password is required')
    .min(6, 'Password must be at least 6 characters')
})

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  }
})

const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: username } = useField<string>('username')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit((values) => {
  authStore
    .register(values.firstname, values.lastname, values.username, values.email, values.password)
    .then(() => {
      router.push({ name: 'home-view' })
    })
    .catch(() => {
      messageStore.updateMessage('could not register')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
  console.log(values)
})

const props = defineProps<{
  country: Country
  id: String
}>()

const { country } = toRefs(props)
</script>

<template>
  <div class="relative">
    <p
      v-if="messageStore.message"
      class="fixed top-0 left-0 w-full p-3 bg-yellow-300 text-black font-medium shadow-lg z-50 text-center"
    >
      {{ messageStore.message }}
    </p>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="text-center">
        <p>Register here</p>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div>
              <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900"
                >Firstname</label
              >
              <InputText
                type="text"
                v-model="firstname"
                placeholder="Firstname"
                :error="errors['firstname']"
              />
            </div>
            <div>
              <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900"
                >Lastname</label
              >
              <InputText
                type="text"
                v-model="lastname"
                placeholder="Lastname"
                :error="errors['lastname']"
              />
            </div>
            <div>
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
                >Username</label
              >
              <InputText
                type="text"
                v-model="username"
                placeholder="Username"
                :error="errors['username']"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <InputText
                type="text"
                v-model="email"
                placeholder="Email address"
                :error="errors['email']"
              />
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
              </div>
              <InputText
                type="password"
                v-model="password"
                placeholder="Password"
                :error="errors['password']"
              />
            </div>
            <div>
              <button type="submit" class="bg-blue-500 text-white p-2 rounded">Register Me!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
