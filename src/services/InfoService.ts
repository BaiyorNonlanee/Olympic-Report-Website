import type { Country } from '@/types'
import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'

export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get('/countries?_limit=' + perPage + '&_page=' + page)
  },
  getCountry(id: string) {
    return apiClient.get('/countries/' + id)
  },
  saveCountry(country: any): Promise<AxiosResponse<Country>> {
  return apiClient.post<Country>('/addCountries', country);
  }
    
}

