// @/composables/useProgress.js
import { ref } from 'vue'
import { startProgress, endProgress } from '@/utils/stagedProgress'

/**
 * Vue 3 组合式函数：用于控制 NProgress 进度条，提供响应式状态和便捷方法
 */
export function useProgress() {
  const isLoading = ref(false)  // 响应式状态：是否正在加载

  /**
   * 启动分阶段进度条
   * @param {Array<{ value: number, delay: number }>} stages - 进度阶段配置
   * @returns {Promise<void>}
   */
  const start = async (stages = [
    { value: 0.1, delay: 200 },
    { value: 0.1, delay: 500 }, // 停顿
    { value: 0.4, delay: 300 },
    { value: 0.4, delay: 400 }, // 停顿
    { value: 0.8, delay: 200 },
    { value: 1.0, delay: 100 },
  ]) => {
    isLoading.value = true
    try {
      await startProgress(stages)
    } finally {
      isLoading.value = false // 确保无论成功或失败都更新状态
    }
  }

  // 立即结束进度条（用于异常、中断等场景）
  const finish = () => {
    endProgress()
    isLoading.value = false
  }

  return {
    isLoading,
    start,
    finish
  }
}