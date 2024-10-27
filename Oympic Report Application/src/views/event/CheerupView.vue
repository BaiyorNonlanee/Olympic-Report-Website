<script setup lang="ts">
import { ref } from 'vue'
// import { useCommentsStore, defineProps } from '@/stores/comment'
import { useCommentsStore } from '@/stores/comment'
import { useAuthStore } from '@/stores/auth'
import type { Country } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true
  }
})

const commentsStore = useCommentsStore()
const authStore = useAuthStore()
const newComment = ref('')

const addComment = () => {
  if (newComment.value.trim()) {
    const username = authStore.currentUserName 
    const userProfileImage = authStore.currentUserProfileImage 
    const strings = userProfileImage[0]
    const url = strings.slice(1,-1)
    commentsStore.addComment(props.country.countryName, newComment.value, username, url)
    newComment.value = ''
  }
}
</script>

<template>
  <div v-if="props.country" class="gap-4 h-50 px-4 py-6">
    <h1 class="text-customGreen2 font-bold text-4xl">Cheer Your Athlete Here!</h1>

    <div
      v-if="commentsStore.commentsByCountry[props.country.countryName]?.length"
      class="my-4"
    >
      <h2 class="text-2xl font-semibold mb-4 text-customBlue1 text-left">Comments:</h2>
    </div>

    <div class="w-95%">
      <div
        v-for="comment in commentsStore.commentsByCountry[props.country.countryName]"
        :key="comment.id"
        class="bg-customBrown2 border-2 border-customBrown1 rounded-lg p-4 my-1.5 text-lg text-left flex items-center"
      >
        <img :src="comment.images.toString()" alt="Profile" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <strong>{{ comment.username }}:</strong>
          {{ comment.text }}
        </div>
      </div>
    </div>

    <div class="w-95% items-center justify-center">
      <textarea
        v-model="newComment"
        class="w-full h-16 p-3 border border-gray-300 rounded-lg bg-white text-customBlue1 text-base mt-4 mb-5"
        placeholder="Cheer up your athlete!"
      ></textarea>
    </div>

    <div class="flex justify-center mt-3">
      <button
        @click="addComment"
        class="px-6 py-3 text-white bg-customBlue2 rounded-lg hover:bg-customBlue1 transform transition-transform duration-200 ease-in-out hover:scale-105"
      >
        Submit
      </button>
    </div>
  </div>
</template>
