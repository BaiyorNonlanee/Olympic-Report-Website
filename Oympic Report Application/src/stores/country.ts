import type { InfoState, Country } from '@/types'
import { defineStore } from 'pinia'
export const useInfoStore = defineStore('country', {
  state: (): InfoState => ({
    country: null
  }),
  actions: {
    setCountry(country: Country): void {
      this.country = country
    }
  }
})
