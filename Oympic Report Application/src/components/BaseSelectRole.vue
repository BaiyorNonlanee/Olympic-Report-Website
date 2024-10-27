<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import { Role } from '../../types'; // Assuming Role type is defined

// Define props and emit events for v-model and role change
const emit = defineEmits(['update:modelValue', 'onChange']);

// Props for the dropdown component
interface BaseSelectRoleProps {
  label: string;
  options: Role[]; // Role array to display in the dropdown
  modelValue: number | null; // Selected role ID
}

// Default props for the component
const props = withDefaults(defineProps<BaseSelectRoleProps>(), {
  label: '',
  modelValue: null
});

// Handle role selection change
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedValue = parseInt(target.value);

  // Emit updated role ID for v-model and handle custom logic
  emit('update:modelValue', selectedValue);
  emit('onChange', selectedValue); // Custom event for further handling
};
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