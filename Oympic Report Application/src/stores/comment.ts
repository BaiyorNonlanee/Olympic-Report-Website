// import { defineStore } from 'pinia'
// import { ref } from 'vue'

// export const useCommentsStore = defineStore('comments', () => {
//   const commentsByCountry = ref<Record<string, { id: number; text: string }[]>>({})

//   const addComment = (countryName: string, commentText: string) => {
//     if (!commentsByCountry.value[countryName]) {
//       commentsByCountry.value[countryName] = []
//     }
//     commentsByCountry.value[countryName].push({
//       id: Date.now(), 
//       text: commentText
//     })
//   }

//   return {
//     commentsByCountry,
//     addComment
//   }
// })
import { defineStore } from 'pinia'
import { ref } from 'vue'

// กำหนดโครงสร้างข้อมูลของคอมเมนต์ให้รองรับ text และ profilePicture
interface Comment {
  id: number;
  text: string;
  profilePicture: string;
}

export const useCommentsStore = defineStore('comments', () => {
  const commentsByCountry = ref<Record<string, Comment[]>>({})

  // เพิ่มพารามิเตอร์ profilePicture สำหรับข้อมูลรูปโปรไฟล์ของผู้คอมเมนต์
  const addComment = (countryName: string, comment: { text: string; profilePicture: string }) => {
    if (!commentsByCountry.value[countryName]) {
      commentsByCountry.value[countryName] = []
    }
    commentsByCountry.value[countryName].push({
      id: Date.now(),
      text: comment.text,
      profilePicture: comment.profilePicture
    })
  }

  return {
    commentsByCountry,
    addComment
  }
})
