// @/utils/stagedProgress.js
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置 NProgress
NProgress.configure({
  trickle: false,
  showSpinner: false,
  easing: 'ease-out',
  speed: 2000,
})

let timeoutId = null

/**
 * 手动分阶段进度条
 * @param {Array<{ value: number, delay: number }>} stages
 * @returns {Promise<void>}
 */
export const startProgress = (stages) => {
  return new Promise((resolve) => {
    if (timeoutId) clearTimeout(timeoutId) // 清理旧定时器
    if (!Array.isArray(stages) || stages.length === 0) {  // 无阶段时，结束进度条
      NProgress.done()
      resolve()
      return
    }

    // 开始
    NProgress.start()
    const firstStage = stages[0]
    NProgress.set(firstStage?.value ?? 0.1) // 设置初始进度
    // NProgress.set(stages[0]?.value || 0.1)

    // 递归阶段推进
    const proceedToNext = (index) => {
      if (index >= stages.length) {
        NProgress.done()
        resolve()
        return
      }

      const stage = stages[index]
      NProgress.set(stage.value)

      timeoutId = setTimeout(() => {
        proceedToNext(index + 1)
      }, stage.delay)
    }
    timeoutId = setTimeout(() => proceedToNext(1), firstStage?.delay ?? 300)
  })
}

// 立即完成进度条（用于异常、跳转或中断）
export const endProgress = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  NProgress.done()
}