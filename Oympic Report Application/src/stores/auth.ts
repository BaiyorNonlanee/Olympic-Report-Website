import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { Country, User } from '@/types'
import router from '@/router'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null
  }),
  getters: {
    currentUserName(): string {
      return this.user?.username || ''  
    },
    currentId(): number {
      return this.user?.id || 0 
    },
    // new
    currentUserProfileImage(): string[] {
      console.log(this.user?.images)
      return this.user?.images || [''];  
    },
    isAdmin(): boolean {
      return this.user?.roles.includes('ROLE_ADMIN') || false
    },
    authorizationHeader(): string {
      return `Bearer ${this.token}`
    },
    isMasterAdmin(): boolean {
      return this.user?.roles.includes('ROLE_MASTERADMIN') || false
    }
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await apiClient.post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        });
        
        this.token = response.data.access_token;
        this.user = response.data.user;

        localStorage.setItem('access_token', this.token as string);
        localStorage.setItem('user', JSON.stringify(this.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        return response;
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed, please check your credentials.');
      }
    },
    async register(firstname: string, lastname: string, username: string, email: string, password: string, images: string[]) {
      try {
        const response = await apiClient.post('/api/v1/auth/register', {
          firstname,
          lastname,
          username,
          email,
          password,
          images
        });

        this.token = response.data.access_token;
        this.user = response.data.user;

        localStorage.setItem('access_token', this.token as string);
        localStorage.setItem('user', JSON.stringify(this.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        return response;
      } catch (error) {
        console.error('Registration error:', error);
        throw new Error('Registration failed, please try again.');
      }
    },
    reload(token: string, user: User) {
      this.token = token;
      this.user = user;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});
