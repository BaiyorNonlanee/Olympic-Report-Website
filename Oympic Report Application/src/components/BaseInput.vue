<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string | number
  }>(),
  {
    label: '',
    modelValue: ''
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
}>()

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement)?.value)
}
</script>

<template>
  <label v-if="props.label">
    {{ props.label }}
  </label>
  <input
    class="mb-6"
    :value="props.modelValue"
    :placeholder="props.label"
    @input="updateValue($event)"
    v-bind="$attrs"
  />
</template>
