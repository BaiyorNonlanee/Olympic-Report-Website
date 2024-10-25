<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import UniqueID from '@/features/UniqueID';
import ErrorMessage from './ErrorMessage.vue';

const props = defineProps<{
  modelValue: number;  // The value bound to the input
  error?: string;      // Optional error message
  placeholder?: string; // Optional placeholder
}>();

const emit = defineEmits(['update:modelValue']);
const uuid = UniqueID().getID();

// Internal value to hold the numeric input
const internalValue = ref(props.modelValue);

// Watch for changes in the prop to keep internal value in sync
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

// Emit value change
const updateValue = () => {
  emit('update:modelValue', internalValue.value);  // Emit the updated value
};
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