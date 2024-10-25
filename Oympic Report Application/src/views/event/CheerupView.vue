<script setup lang="ts">
import { ref } from 'vue'
import { useCommentsStore } from '@/stores/comment'
import type { Country } from '@/types'
import type { PropType } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true
  }
})

const commentsStore = useCommentsStore()
const authStore = useAuthStore() // Store สำหรับดึงข้อมูลผู้ใช้ที่เข้าสู่ระบบ
const newComment = ref('')

// เพิ่มคอมเมนต์ พร้อมรูปโปรไฟล์ของผู้ใช้ที่เข้าสู่ระบบ
const addComment = () => {
  if (newComment.value.trim()) {
    const profilePicture = authStore.user?.images; // Ensure `profilePicture` is accessed correctly
    commentsStore.addComment(props.country.countryName, {
      text: newComment.value,
      images: profilePicture
    });
    newComment.value = '';
  }
}
</script>

<template>
  <div v-if="props.country" class="gap-4 h-50 px-4 py-6">
    <h1 class="text-customGreen2 font-bold text-4xl">Cheer Your Athlete Here!</h1>

    <div v-if="commentsStore.commentsByCountry[props.country.countryName]?.length" class="my-4">
      <h2 class="text-2xl font-semibold mb-4 text-customBlue1 text-left">Comments:</h2>
    </div>
    
    <div class="w-95%">
      <div
        v-for="comment in commentsStore.commentsByCountry[props.country.countryName]"
        :key="comment.id"
        class="bg-customBrown2 border-2 border-customBrown1 rounded-lg p-4 my-1.5 text-lg text-left flex items-center gap-3"
      >
        <!-- แสดงรูปโปรไฟล์ของผู้คอมเมนต์ -->
        <img v-if="comment.profilePicture" :src="comment.profilePicture" alt="Profile Picture" class="w-10 h-10 rounded-full" />
        <span>{{ comment.text }}</span>
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
