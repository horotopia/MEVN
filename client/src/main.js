import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/tailwind.css'

const app = createApp(App)

.use(router)

app.use(createPinia())

app.mount('#app')
