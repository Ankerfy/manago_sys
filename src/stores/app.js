// @/stores/app.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isSidebarCollapse: false, // 菜单折叠状态
    darkMode: false,          // 深色模式
    theme: 'light',           // 主题模式 默认light
    language: 'zh',           // 语言
    showPopover: false,       // 通知弹窗状态
    showPanel: false,        // 主题面板状态
  }),

  // 启用持久化，指定存储
  persist: {
    paths: ['isSidebarCollapse', 'darkMode', 'theme', 'language'],
    storage: localStorage,
  },

  actions: {
    toggleSidebar() {
      this.isSidebarCollapse = !this.isSidebarCollapse
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      this.theme = this.darkMode ? 'dark' : 'light'
    },
    setTheme(theme) {
      this.theme = theme
    },
    togglePopover() {
      this.showPopover = !this.showPopover
    },
    togglePanel() {
      this.showPanel = !this.showPanel
    }
  },

  getters: {
    // 侧边栏宽度
    sidebarWidth: (state) => state.isSidebarCollapse ? 63 : 200,
    // 主内容区 margin-left
    mainMarginLeft: (state) => `${state.isSidebarCollapse ? 63 : 200}px`,
    // 用于其他计算
    // mainMarginLeftNumber: (state) => state.isSidebarCollapse ? 63 : 200

  }
})