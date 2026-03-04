// @/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUIStore } from '@/stores'

// 定义 meta 类型（可选但推荐）
interface RouteMeta {
  title: string
  icon: string
}

// 动态导入组件（TypeScript 会自动推导类型）
const Home = () => import('@/views/HomeView.vue')
const DashboardOverview = () => import('@/views/dashboard/Overview.vue')
const DashboardUsers = () => import('@/views/dashboard/Users.vue')
const MonitorData = () => import('@/views/monitor/Data.vue')
const MonitorView = () => import('@/views/monitor/ViewData.vue')
const About = () => import('@/views/AboutView.vue')
const NotFound = () => import('@/views/404.vue')

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '首页', icon: 'House' } satisfies RouteMeta,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { title: '仪表盘', icon: 'DataLine' } satisfies RouteMeta,
    redirect: '/dashboard/overview',
    children: [
      {
        path: 'overview',
        name: 'DashboardOverview',
        component: DashboardOverview,
        meta: { title: '数据概览', icon: '' } satisfies RouteMeta,
      },
      {
        path: 'users',
        name: 'DashboardUsers',
        component: DashboardUsers,
        meta: { title: '用户活跃度', icon: '' } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/monitor',
    name: 'Monitor',
    meta: { title: '系统监控', icon: 'Monitor' } satisfies RouteMeta,
    redirect: '/monitor/data',
    children: [
      {
        path: 'data',
        name: 'MonitorData',
        component: MonitorData,
        meta: { title: '数据监控', icon: '' } satisfies RouteMeta,
      },
      {
        path: 'view',
        name: 'MonitorView',
        component: MonitorView,
        meta: { title: '数据可视化', icon: '' } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于', icon: 'InfoFilled' } satisfies RouteMeta,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404', icon: '' } satisfies RouteMeta,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 全局前置守卫：启动进度条
router.beforeEach(async (to, _from, next) => {
  const progress = useUIStore()
  try {
    progress.finish() // 取消上一次进度
    await progress.start() // 启动新进度
    next()
  } catch {
    next()
  }
})

// 路由错误处理
router.onError(() => {
  const progress = useUIStore()
  progress.finish()
})

export default router
