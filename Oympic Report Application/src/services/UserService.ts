import type { User } from '@/types'
import apiClient from './AxiosClient'

export default {
  getUsers(perPage: number, page: number) {
    return apiClient.get('/users?_limit=' + perPage + '&_page=' + page)
  },
  getUserById(id: string) {
    return apiClient.get('/users/' + id)
  },
  getUser() {
    return apiClient.get('/users')
  },
  getRoleUser() {
    return apiClient.get('/roles')
  },
  editUserRole(id: number, userId: number, role: string) {
    return apiClient.put('/api/v1/auth/edit-role', {
      id: id,
      userid: userId,
      role: role
    })
  },
  getRoleUserById(id: string) {
    return apiClient.get(`/roles/${id}`)
  }
}
