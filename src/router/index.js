import { createRouter, createWebHistory } from 'vue-router'
import { startProgress as start, endProgress as end } from '@/utils/stagedProgress'

const HomeView = () => import('@/components/layout/MainContent.vue')
const DashboardOverview = () => import('@/views/dashboard/Overview.vue')
const DashboardUsers = () => import('@/views/dashboard/Users.vue')
const MonitorData = () => import('@/views/monitor/Data.vue')
const MonitorView = () => import('@/views/monitor/View.vue')
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
const AboutView = () => import('@/views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: { title: '首页', icon: 'House' },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: { title: '仪表盘', icon: 'DataLine' },
      redirect: '/dashboard/overview',
      children: [
        {
          path: 'overview',
          name: 'DashboardOverview',
          component: DashboardOverview,
          meta: { title: '数据概览', icon: '' },
        },
        {
          path: 'users',
          name: 'DashboardUsers',
          component: DashboardUsers,
          meta: { title: '用户活跃度', icon: '' },
        },
      ],
    },
    {
      path: '/monitor',
      name: 'Monitor',
      meta: { title: '系统监控', icon: 'Monitor' },
      redirect: '/monitor/data',
      children: [
        {
          path: 'data',
          name: 'MonitorData',
          component: MonitorData,
          meta: { title: '数据监控', icon: '' },
        },
        {
          path: 'view',
          name: 'MonitorView',
          component: MonitorView,
          meta: { title: '数据可视化', icon: '' },
        },
      ],
    },
    {
      path: '/workspace',
      name: 'Workspace',
      meta: { title: '工作台', icon: 'OfficeBuilding' },
      redirect: '/workspace/tasks',
      children: [
        {
          path: 'tasks',
          name: 'WorkspaceTasks',
          component: WorkspaceTasks,
          meta: { title: '任务中心', icon: '' },
        },
        {
          path: 'calendar',
          name: 'WorkspaceCalendar',
          component: WorkspaceCalendar,
          meta: { title: '日程安排', icon: '' },
        },
      ],
    },
    {
      path: '/entertainment',
      name: 'Entertainment',
      meta: { title: '娱乐资讯', icon: 'Film' },
      redirect: '/entertainment/news',
      children: [
        {
          path: 'news',
          name: 'EntertainmentNews',
          component: EntertainmentNews,
          meta: { title: '最新资讯', icon: '' },
        },
        {
          path: 'movies',
          name: 'EntertainmentMovies',
          component: EntertainmentMovies,
          meta: { title: '影视推荐', icon: '' },
        },
      ],
    },
    {
      path: '/messages',
      name: 'Messages',
      meta: { title: '公告消息', icon: 'ChatLineSquare' },
      redirect: '/messages/announcements',
      children: [
        {
          path: 'announcements',
          name: 'MessagesAnnouncements',
          component: MessagesAnnouncements,
          meta: { title: '公告栏', icon: '' },
        },
        {
          path: 'inbox',
          name: 'MessagesInbox',
          component: MessagesInbox,
          meta: { title: '私信中心', icon: '' },
        },
      ],
    },
    {
      path: '/media',
      name: 'Media',
      meta: { title: '媒体中心', icon: 'Headset' },
      redirect: '/media/music',
      children: [
        {
          path: 'music',
          name: 'MediaMusic',
          component: MediaMusic,
          meta: { title: '在线音乐播放', icon: '' },
        },
        {
          path: 'video',
          name: 'MediaVideo',
          component: MediaVideo,
          meta: { title: '随机视频播放', icon: '' },
        },
      ],
    },
    {
      path: '/geo',
      name: 'Geo',
      meta: { title: '地图天气', icon: 'Location' },
      redirect: '/geo/map',
      children: [
        {
          path: 'map',
          name: 'GeoMap',
          component: GeoMap,
          meta: { title: '地图数据', icon: '' },
        },
        {
          path: 'weather',
          name: 'GeoWeather',
          component: GeoWeather,
          meta: { title: '天气预报', icon: '' },
        },
      ],
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
      meta: { title: '关于', icon: 'InfoFilled' },
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
