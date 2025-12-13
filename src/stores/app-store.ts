// @/stores/app-store.ts
import { defineStore } from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'

// 状态接口
interface AppState {
  isSidebarCollapse: boolean // 菜单折叠状态
  darkMode: boolean // 深色模式
  theme: 'light' | 'dark' // 主题外观 默认light
  language: string // 语言
}

export const useAppStore = defineStore('AppStore', {
  state: (): AppState => ({
    isSidebarCollapse: false,
    darkMode: false,
    theme: 'light',
    language: 'zh',
  }),

  getters: {
    // 侧边栏宽度
    sidebarWidth(): number {
      return this.isSidebarCollapse ? 63 : 200
    },
    // 主内容区 margin-left
    mainMarginLeftNumber(): number {
      return this.isSidebarCollapse ? 63 : 200
    },
  },

  actions: {
    toggleSidebar() {
      this.isSidebarCollapse = !this.isSidebarCollapse
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      this.theme = this.darkMode ? 'dark' : 'light'
    },
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
  },

  // 启用持久化，指定存储
  persist: {
    key: 'app-settings',
    paths: ['isSidebarCollapse', 'darkMode', 'theme', 'language'],
    storage: localStorage,
  },
})
