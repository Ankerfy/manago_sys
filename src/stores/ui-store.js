// @/stores/ui-store.js
import { defineStore } from 'pinia'

export const useUIStore = defineStore('UIStore', {
  state: () => ({
    showPopover: false,       // 通知弹窗
    showPanel: false,         // 主题面板
    isLoading: false,         // 加载状态
  }),

  actions: {
    togglePopover() {
      this.showPopover = !this.showPopover
    },
    togglePanel() {
      this.showPanel = !this.showPanel
    },
    toggleLoading() {
      this.isLoading = !this.isLoading
    },
  },
})