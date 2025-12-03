// @/composables/useHeaderToolbar.ts
import { useRouter } from 'vue-router'
import { useAppStore, useUIStore } from '@/stores'

// 定义所有支持的toolbar action名称
export type HeaderAction =
  | 'toggleSidebar'
  | 'goHome'
  | 'goMusic'
  | 'toggleDarkMode'
  | 'toggleFullScreen'
  | 'openNotification'
  | 'openSettings'

// 定义actions对象类型
export type HeaderActions = Record<HeaderAction, () => void>

export const useHeaderToolbar = () => {
  // 路由和状态
  const router = useRouter()
  const appStore = useAppStore()
  const uiStore = useUIStore()

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
        document.documentElement.requestFullscreen().catch((err) => {
          console.log('全屏切换失败：', err)
        })
      } else {
        document.exitFullscreen?.()
      }
    },
    // 开/关通知弹窗
    openNotification: () => uiStore.togglePopover(),
    // 开/关主题面板
    openSettings: () => uiStore.togglePanel(),
  }

  return {
    actions,
  }
}
