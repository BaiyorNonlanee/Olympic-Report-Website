<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue'
import { Role } from '/types'

const emit = defineEmits(['update:modelValue', 'onChange'])

interface BaseSelectRoleProps {
  label: string
  options: Role[]
  modelValue: number | null
}

const props = withDefaults(defineProps<BaseSelectRoleProps>(), {
  label: '',
  modelValue: null
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedValue = parseInt(target.value)
  emit('update:modelValue', selectedValue)
  emit('onChange', selectedValue)
}
</script>

<template>
  <label v-if="props.label" class="block mb-2">{{ props.label }}</label>
  <select
    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-sm sm:text-base"
    v-bind="$attrs"
    v-model="props.modelValue"
    @change="handleChange"
  >
    <option v-for="option in props.options" :key="option.id" :value="option.id">
      {{ option.roles }}
    </option>
  </select>
</template>
