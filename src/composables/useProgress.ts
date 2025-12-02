// @/composables/useProgress.ts
import { useUIStore } from '@/stores'
import type { ProgressStage } from '@/utils/stagedProgress'

/**
 * Vue 3 组合式函数：用于在组件中便捷访问全局进度条状态
 * 实际状态和逻辑由 Pinia Store 管理
 */
export function useProgress() {
  const store = useUIStore()

  return {
    isLoading: store.isLoading,
    // start: store.start,
    start: (stages?: ProgressStage[]) => store.start(stages),
    finish: () => store.finish,
  }
}
