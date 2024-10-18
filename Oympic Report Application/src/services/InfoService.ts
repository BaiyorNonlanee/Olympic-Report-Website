import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/BaiyorNonlanee/olympicDB',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get('/country?_limit=' + perPage + '&_page=' + page)
  },
  getCountry(id: string) {
    return apiClient.get('/country/' + id)
  }
}
