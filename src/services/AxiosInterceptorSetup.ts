import apiClient from '@/services/AxiosClient.js'

apiClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      request.headers['Authorization'] = 'Bearer ' + token
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)
