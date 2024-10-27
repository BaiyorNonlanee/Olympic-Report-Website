<script setup lang="ts">
import type { Country } from '@/types'
import { ref } from 'vue'
const country = ref<Country>({
  id: 0,
  country_name: '',
  description: '',
  image: '',
  gold: 0,
  silver: 0,
  bronze: 0,
  rankValue: 0,
  sports: ''
})
</script>
