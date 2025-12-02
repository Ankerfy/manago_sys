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
const WorkspaceTasks = () => import('@/views/workspace/Tasks.vue')
const WorkspaceCalendar = () => import('@/views/workspace/Calendar.vue')
const EntertainmentNews = () => import('@/views/entertainment/News.vue')
const EntertainmentMovies = () => import('@/views/entertainment/Movies.vue')
const MessagesAnnouncements = () => import('@/views/messages/Announcements.vue')
const MessagesInbox = () => import('@/views/messages/Inbox.vue')
const MediaMusic = () => import('@/views/media/Music.vue')
const MediaVideo = () => import('@/views/media/Video.vue')
const GeoMap = () => import('@/views/geo/Map.vue')
const GeoWeather = () => import('@/views/geo/Weather.vue')
const About = () => import('@/views/AboutView.vue')

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
    path: '/workspace',
    name: 'Workspace',
    meta: { title: '工作台', icon: 'OfficeBuilding' } satisfies RouteMeta,
    redirect: '/workspace/tasks',
    children: [
      {
        path: 'tasks',
        name: 'WorkspaceTasks',
        component: WorkspaceTasks,
        meta: { title: '任务中心', icon: '' } satisfies RouteMeta,
      },
      {
        path: 'calendar',
        name: 'WorkspaceCalendar',
        component: WorkspaceCalendar,
        meta: { title: '日程安排', icon: '' } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/entertainment',
    name: 'Entertainment',
    meta: { title: '娱乐资讯', icon: 'Film' } satisfies RouteMeta,
    redirect: '/entertainment/news',
    children: [
      {
        path: 'news',
        name: 'EntertainmentNews',
        component: EntertainmentNews,
        meta: { title: '最新资讯', icon: '' } satisfies RouteMeta,
      },
      {
        path: 'movies',
        name: 'EntertainmentMovies',
        component: EntertainmentMovies,
        meta: { title: '影视推荐', icon: '' } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/messages',
    name: 'Messages',
    meta: { title: '公告消息', icon: 'ChatLineSquare' } satisfies RouteMeta,
    redirect: '/messages/announcements',
    children: [
      {
        path: 'announcements',
        name: 'MessagesAnnouncements',
        component: MessagesAnnouncements,
        meta: { title: '公告栏', icon: '' } satisfies RouteMeta,
      },
      {
        path: 'inbox',
        name: 'MessagesInbox',
        component: MessagesInbox,
        meta: { title: '私信中心', icon: '' } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/media',
    name: 'Media',
    meta: { title: '媒体中心', icon: 'Headset' } satisfies RouteMeta,
    redirect: '/media/music',
    children: [
      {
        path: 'music',
        name: 'MediaMusic',
        component: MediaMusic,
        meta: { title: '在线音乐播放', icon: '' } satisfies RouteMeta,
      },
      {
        path: 'video',
        name: 'MediaVideo',
        component: MediaVideo,
        meta: { title: '随机视频播放', icon: '' } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/geo',
    name: 'Geo',
    meta: { title: '地图天气', icon: 'Location' } satisfies RouteMeta,
    redirect: '/geo/map',
    children: [
      {
        path: 'map',
        name: 'GeoMap',
        component: GeoMap,
        meta: { title: '地图数据', icon: '' } satisfies RouteMeta,
      },
      {
        path: 'weather',
        name: 'GeoWeather',
        component: GeoWeather,
        meta: { title: '天气预报', icon: '' } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于', icon: 'InfoFilled' } satisfies RouteMeta,
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
