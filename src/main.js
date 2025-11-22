import './assets/css/main.css'
import './assets/css/nprogress-custom.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores/pinia'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import NProgress from 'nprogress'

// 配置 NProgress
NProgress.configure({
  trickle: false,
  showSpinner: false,
  easing: 'ease-out',
  speed: 2000,
})

const app = createApp(App)

// 全局注册所有图标组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
