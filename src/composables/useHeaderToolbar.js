// @/composables/useHeaderToolbar.js
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export const useHeaderToolbar = () => {
  // 路由和状态
  const router = useRouter()
  const appStore = useAppStore()

  // 动作
  const actions = {
    // 左部
    toggleSidebar: () => appStore.toggleSidebar(),
    goHome: () => router.push('/home'),
    goMusic: () => router.push('/media/music'),
    // 切换深色模式
    toggleDarkMode: () => appStore.toggleDarkMode(),
    // 全屏切换
    toggleFullScreen: () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.log('全屏切换失败：', err)
        })
      } else {
        document.exitFullscreen?.()
      }
    },
    // 开/关通知弹窗
    openNotification: () => appStore.togglePopover(),
    // 开/关主题面板
    openSettings: () => appStore.togglePanel()
  }

  return {
    actions,
  }
}
