import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'nprogress/nprogress.css'
import './assets/style.css'
import '@/services/AxiosInterceptorSetup'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
