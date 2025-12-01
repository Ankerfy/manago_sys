// @/stores/ui-store.js
import { startProgress, endProgress } from '@/utils/stagedProgress'

const DEFAULT_PROGRESS_SATGES = [
  { value: 0.1, delay: 200 },
  { value: 0.1, delay: 500 }, // 停顿
  { value: 0.4, delay: 300 },
  { value: 0.4, delay: 400 }, // 停顿
  { value: 0.8, delay: 200 },
  { value: 1.0, delay: 100 },
]

export const useUIStore = defineStore('UIStore', {
  state: () => ({
    showPopover: false, // 通知弹窗
    showPanel: false, // 主题面板
    isLoading: false, // 加载状态
  }),

  actions: {
    togglePopover() {
      this.showPopover = !this.showPopover
    },
    togglePanel() {
      this.showPanel = !this.showPanel
    },
    // 加载进度条
    async start(stages = DEFAULT_PROGRESS_SATGES) {
      this.isLoading = true
      try {
        await startProgress(stages)
      } finally {
        this.isLoading = false // 确保无论成功或失败都更新状态
      }
    },
    finish() {
      endProgress()
      this.isLoading = false
    },
  },
})
