<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import UniqueID from '@/features/UniqueID'
import ErrorMessage from './ErrorMessage.vue'

const props = defineProps<{
  modelValue: number
  error?: string
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])
const uuid = UniqueID().getID()
const internalValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  }
)

const updateValue = () => {
  emit('update:modelValue', internalValue.value)
}
</script>

<template>
  <div>
    <input
      type="number"
      v-model.number="internalValue"
      class="border-2 border-gray-400 p-2 rounded w-full sm:w-[100px]"
      :min="0"
      :placeholder="placeholder"
      :aria-invalid="error ? true : false"
      :aria-describedby="error ? `${uuid}-error` : undefined"
      @input="updateValue"
    />
    <ErrorMessage v-if="error" :id="`${uuid}-error`" class="text-red-700">
      {{ error }}
    </ErrorMessage>
  </div>
</template>
