// @/composables/useSreenSize.ts
import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * 判断当前屏幕尺寸是否为 md 或以上
 * @returns 屏幕尺寸状态
 */
export function useSreenSize() {
  const isMdOrLarger = ref(false)
  const mediaQuery = window.matchMedia('(min-width: 768px)') // md 以上
  const update = (e: MediaQueryListEvent | MediaQueryList) => {
    isMdOrLarger.value = e.matches
  }

  onMounted(() => {
    update(mediaQuery)
    mediaQuery.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mediaQuery.removeEventListener('change', update)
  })

  return { isMdOrLarger }
}
