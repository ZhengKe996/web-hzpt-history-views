import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mLibs from './libs'
import { createPinia } from 'pinia'
import mDirectives from './directives'

import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/**
 * @description 注册 svg-icon
 */
import 'virtual:svg-icons-register'

import { useREM } from './utils/flexible'
import preview from 'vue3-image-preview'

useREM()

createApp(App)
  .use(router)
  .use(mLibs)
  .use(preview)
  .use(mDirectives)
  .use(ElementPlus)
  .use(createPinia())
  .mount('#app')
