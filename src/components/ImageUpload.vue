<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref, withDefaults, defineProps, defineEmits, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
// import { log } from 'console';

interface Props {
    modelValue?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => []
})

const convertStringToMedia = (str: string[]): any => {
    return str.map((element: string) => {
        return {
            name: element
        }
    })
}

const emit = defineEmits(['update:modelValue'])
const convertMediaToString = (media: any): string[] => {
    const output: string[] = []
    console.log(" 321 " + media.value)
    media.forEach ((element: any) => {
        output.push(element.name)
        console.log(element.name + " 123")
    })
    return output
}

const media = ref(convertStringToMedia(props.modelValue))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)
const onChanged = (files: any) => {
    emit('update:modelValue', convertMediaToString(files))
    console.log(files);
    
}
// Initialize the auth store
const authStore = useAuthStore();
const authorizeHeader = computed(() => {
  return { authorization: authStore.authorizationHeader}
})
</script>

<template>
  <Uploader :server="uploadUrl" @change="onChanged" :media="media"></Uploader>
</template> 
<!-- <template>
    <Uploader :server="uploadUrl" @change="onChanged" :media="media" :headers="authorizeHeader"></Uploader>
  </template>  -->
