// @/stores/app-store.js
export const useAppStore = defineStore('AppStore', {
  state: () => ({
    isSidebarCollapse: false, // 菜单折叠状态
    darkMode: false,          // 深色模式
    theme: 'light',           // 主题外观 默认light
    language: 'zh',           // 语言
  }),

  // 启用持久化，指定存储
  persist: {
    key: 'app-settings',
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