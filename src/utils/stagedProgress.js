// @/utils/stagedProgress.js
import NProgress from 'nprogress'

/**
 * 手动分阶段进度条
 * @param {Array<{ value: number, delay: number }>} stages
 * @returns {Promise<void>}
 */
export const startProgress = (stages) => {
  let localTimeoutId = null

  const cleanup = () => {
    if (localTimeoutId) {
      clearTimeout(localTimeoutId)
      localTimeoutId = null
    }
  }

  return new Promise((resolve) => {
    cleanup() // 清理旧定时器

    if (!Array.isArray(stages) || stages.length === 0) {  // 无阶段时，结束进度条
      NProgress.done()
      resolve()
      return
    }

    // 开始
    NProgress.start()
    const firstStage = stages[0]
    NProgress.set(firstStage?.value ?? 0.1) // 设置初始进度

    // 递归阶段推进
    const proceedToNext = (index) => {
      if (index >= stages.length) {
        NProgress.done()
        resolve()
        return
      }

      const stage = stages[index]
      NProgress.set(stage.value)
      localTimeoutId = setTimeout(() => proceedToNext(index + 1), stage.delay)
    }
    localTimeoutId = setTimeout(() => proceedToNext(1), firstStage?.delay ?? 300)
  }).finally(cleanup)
}

// 立即完成进度条（用于异常、跳转或中断）
export const endProgress = () => {
  // 调用者需自行处理取消定时器逻辑
  NProgress.done()
}