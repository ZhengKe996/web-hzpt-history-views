import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'

import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import preview from 'vue3-image-preview'

const app = createApp(App)
  .use(router)
  .use(preview)
  .use(ElementPlus)
  .use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
