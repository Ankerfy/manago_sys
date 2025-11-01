import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/layout/MainContent.vue'
import { startProgress as start, endProgress as end } from '@/utils/stagedProgress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/home'],
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // 定义进度阶段
  const PROGRESS_STAGES = [
    { value: 0.1, delay: 200 },
    { value: 0.1, delay: 500 }, // 停顿
    { value: 0.4, delay: 300 },
    { value: 0.4, delay: 400 }, // 停顿
    { value: 0.8, delay: 200 },
    { value: 1.0, delay: 100 },
  ]

  try {
    end()// 清空上一个进度
    await start(PROGRESS_STAGES)
    next()
  } catch (error) {
    next()
  }
})

router.onError(() => {
  end()
})

export default router
