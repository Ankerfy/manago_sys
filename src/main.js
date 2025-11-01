import './assets/css/main.css'
import './assets/css/nprogress-custom.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)

// 全局注册所有图标组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})

app.use(router)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')
