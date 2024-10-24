import type { User} from '@/types'
import apiClient from './AxiosClient'

export default {
  getUsers(perPage: number, page: number) {
    return apiClient.get('/users?_limit=' + perPage + '&_page=' + page)
  },
  getUserById(id: string) {
    return apiClient.get('/users/' + id)
  },
  getUser(){
    return apiClient.get('/users')
  }
    
}

