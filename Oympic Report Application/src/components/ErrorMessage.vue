<script setup lang="ts">
import { defineProps } from 'vue'
interface ErrorMessageProps {
  id: string
}
defineProps<ErrorMessageProps>()
</script>
<template>
  <p aria-live="assertive" class="errorMessage" :id="id">
    <slot />
  </p>
</template>
