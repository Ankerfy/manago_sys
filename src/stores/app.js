// src/stores/app.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isSidebarCollapse: false, // 菜单折叠状态
    theme: 'light',           // 主题模式
    language: 'zh'            // 语言
  }),

  // 启用持久化
  persist: true,

  actions: {
    toggleSidebar() {
      this.isSidebarCollapse = !this.isSidebarCollapse
    },
    setTheme(theme) {
      this.theme = theme
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