import apiClient from './AxiosClient'

export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get('/countries?_limit=' + perPage + '&_page=' + page)
  },
  getCountry(id: string) {
    return apiClient.get('/countries/' + id)
  }
}
