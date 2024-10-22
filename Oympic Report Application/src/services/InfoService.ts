// import type { Country } from '@/types'
// import apiClient from './AxiosClient'

// export default {
//   getCountries(perPage: number, page: number) {
//     return apiClient.get('/countries?_limit=' + perPage + '&_page=' + page)
//   },
//   getCountry(id: string) {
//     return apiClient.get('/countries/' + id)
//   },
//   // ตัวอย่างการเรียกใช้ POST
//   saveCountry(country: Country) {
//   return apiClient.post('/countries', country);
//   }
    
// }
// InfoService.ts
import type { Country } from '@/types';
import apiClient from './AxiosClient';

export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get('/countries?_limit=' + perPage + '&_page=' + page);
  },
  getCountry(id: string) {
    return apiClient.get('/countries/' + id);
  },
  
  saveCountry(country: Country) {
    const token = localStorage.getItem('authToken'); // ดึง token จาก local storage
    if (!token) {
      console.error('No token found, please log in again.');
      throw new Error('Unauthorized'); // หรือจัดการอย่างอื่นตามที่ต้องการ
    }
    return apiClient.post('/countries', country, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }
};
