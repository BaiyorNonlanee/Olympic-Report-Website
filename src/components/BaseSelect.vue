<script setup lang="ts">
import type { Sport } from '@/types'
import { defineProps, withDefaults, defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue', 'onChange'])

interface BaseSelectProps {
  label: string
  options: Sport[]
}
const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: ''
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedValue = target.value
  emit('update:modelValue', selectedValue)
  emit('onChange', selectedValue)
}
</script>

<template>
  <label v-if="props.label">
    {{ props.label }}
  </label>
  <select class="mb-6" v-bind="$attrs" v-model="modelValue" @change="handleChange">
    <option v-for="option in props.options" :key="option.id" :value="option.id">
      {{ option.sportName }}
    </option>
  </select>
</template>
