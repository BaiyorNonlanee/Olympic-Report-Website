// import { defineStore } from 'pinia'
// import axios from 'axios'
// import type { AxiosInstance } from 'axios'
// import type { Country, User } from '@/types'
// const apiClient: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// })
// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     token: null as string | null,
//     user: null as User | null
//   }),
//   getters: {
//     currentUserName(): string {
//       return this.user?.firstname || ''  
//     },
//     isAdmin(): boolean {
//       return this.user?.roles.includes('ROLE_ADMIN') || false
//     }
//     ,
//     authorizationHeader(): string {
//       return `Bearer ${this.token}`
//     }
//   },
//   actions: {
//     login(email: string, password: string) {
//       return apiClient
//         .post('/api/v1/auth/authenticate', {
//           username: email,
//           password: password
//         })
//         .then((response) => {
//           this.token = response.data.access_token
//           this.user = response.data.user
//           localStorage.setItem('token', this.token as string)
//           localStorage.setItem('user', JSON.stringify(this.user))
//           axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
//           return response
//         })
//     },
//     register(
//       firstname: string,
//       lastname: string,
//       username: string,
//       email: string,
//       password: string
//     ) {
//       return apiClient
//         .post('/api/v1/auth/register', {
//           firstname: firstname,
//           lastname: lastname,
//           username: username,
//           email: email,
//           password: password
//         })
//         .then((response) => {
//           this.token = response.data.access_token
//           this.user = response.data.user
//           localStorage.setItem('access_token', this.token as string)
//           localStorage.setItem('user', JSON.stringify(this.user))
//           axios.defaults.headers.common['Authorization'] = 'Bearer ${this.token}'
//           return response
//         })
//     },
//     reload(token: string, user: User) {
//       this.token = token
//       this.user = user
//     },
//     logout() {
//       console.log('logout')
//       this.token = null
//       this.user = null
//       localStorage.removeItem('access_token')
//       localStorage.removeItem('user')
//     }
//   }
// })
import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { User } from '@/types'

// กำหนด Axios client สำหรับการเรียก API
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// สร้าง Pinia store สำหรับ Auth
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null
  }),
  getters: {
    currentUserName(): string {
      return this.user?.firstname || ''
    },
    isAdmin(): boolean {
      return this.user?.roles.includes('ROLE_ADMIN') || false
    },
    authorizationHeader(): string {
      return `Bearer ${this.token}`
    }
  },
  actions: {
    // ฟังก์ชันล็อกอิน
    login(email: string, password: string) {
      return apiClient
        .post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        })
        .then((response) => {
          this.token = response.data.access_token
          this.user = response.data.user
          localStorage.setItem('token', this.token as string)
          localStorage.setItem('user', JSON.stringify(this.user))
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          return response
        })
    },

    // ฟังก์ชันลงทะเบียน
    register(
      firstname: string,
      lastname: string,
      username: string,
      email: string,
      password: string,
      images: File | null
    ) {
      const formData = new FormData();
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (images) formData.append('image', images);

      return apiClient
        .post('/api/v1/auth/register', {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
          _images: ''
        })
        .then((response) => {
          this.token = response.data.access_token
          this.user = { ...response.data.user, images: response.data.user.profilePicture };
          localStorage.setItem('token', this.token as string)
          localStorage.setItem('user', JSON.stringify(this.user))
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          return response
        })
    },

    // ฟังก์ชันรีโหลดข้อมูลผู้ใช้
    reload(token: string, user: User) {
      this.token = token
      this.user = user
    },

    // ฟังก์ชันล็อกเอาท์
    logout() {
      console.log('logout')
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
