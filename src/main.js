import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Toaster } from 'vue-sonner'
import './style.css'

const app = createApp(App)
app.use(router)
app.component('Toaster', Toaster)
app.use(createPinia())
app.mount('#app')
