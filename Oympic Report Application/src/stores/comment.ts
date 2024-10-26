import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentsStore = defineStore('comments', () => {
  const commentsByCountry = ref<Record<string, { id: number; text: string; username: string }[]>>({})

  const addComment = (countryName: string, commentText: string, username: string) => { // Added username parameter
    if (!commentsByCountry.value[countryName]) {
      commentsByCountry.value[countryName] = []
    }
    commentsByCountry.value[countryName].push({
      id: Date.now(), 
      text: commentText, 
      username // Now we include username here
    })
  }

  return {
    commentsByCountry,
    addComment
  }
})