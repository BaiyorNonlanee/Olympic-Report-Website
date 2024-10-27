<script setup lang="ts">
import type { Sport } from '@/types';
import { defineProps, withDefaults, defineEmits } from 'vue';

// Define the modelValue for v-model and emit for events
const emit = defineEmits(['update:modelValue', 'onChange']);

// Interface for props
interface BaseSelectProps {
  label: string;
  options: Sport[];

}

// Default props
const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: '',
  // modelValue: []
});

// Function to handle change and emit the value
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value;

  // Emit the model value update (for v-model)
  emit('update:modelValue', selectedValue);

  // Emit the onChange event for custom logic
  emit('onChange', selectedValue);
};
</script>

<template>
  <label v-if="props.label">
    {{ props.label }}
  </label>
  <select class="mb-6" v-bind="$attrs" v-model="modelValue" @change="handleChange">
    <option v-for="option in props.options" :key="option.id" :value="option.id">{{ option.sportName }}</option>
  </select>
</template>
