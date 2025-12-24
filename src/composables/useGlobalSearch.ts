// @/composables/useGlobalSearch.ts
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Router } from 'vue-router'

// 菜单项结构定义
export interface MenuItem {
  id: string
  name: string
  desc?: string
  path?: string
  icon?: string
}

/**
 * 全局搜索逻辑封装
 * @param menuData - 扁平化的菜单数据 [{ name, desc, path, icon }]
 * @param router - Vue Router 实例
 * @param onOpen - 搜索打开时回调（用于 focus input）
 * @param onScrollToIndex - 滚动到指定索引的回调（由组件实现）
 */
export function useGlobalSearch(
  menuData: MenuItem[],
  router: Router,
  onOpen: () => void = () => {},
  onScrollToIndex: (index: number) => void = () => {},
) {
  const isVisible = ref(false)
  const query = ref('')
  const selectedIndex = ref(-1)

  // 过滤结果
  const filteredResults = computed(() => {
    const q = query.value.trim()
    if (!q) return []
    return menuData.filter(
      (item) =>
        item.name.includes(q) ||
        (item.desc && item.desc?.includes(q)) ||
        (item.path && item.path?.includes(q)),
    )
  })

  // 打开搜索
  const openSearch = () => {
    isVisible.value = true
    query.value = ''
    selectedIndex.value = -1
    nextTick(() => {
      onOpen()
    })
  }

  // 关闭搜索
  const closeSearch = () => {
    isVisible.value = false
    query.value = ''
    selectedIndex.value = -1
  }

  // 处理输入
  const handleInput = () => {
    selectedIndex.value = -1
  }

  // 循环导航
  const moveDown = () => {
    const len = filteredResults.value.length
    if (len === 0) return
    selectedIndex.value = selectedIndex.value === -1 ? 0 : (selectedIndex.value + 1) % len
  }

  const moveUp = () => {
    const len = filteredResults.value.length
    if (len === 0) return
    selectedIndex.value =
      selectedIndex.value === -1 ? len - 1 : (selectedIndex.value - 1 + len) % len
  }

  // 选择项
  const handleSelect = (item?: MenuItem) => {
    let targetItem: MenuItem | undefined
    if (item) {
      targetItem = item
    } else {
      if (filteredResults.value.length > 0) {
        const idx = selectedIndex.value === -1 ? 0 : selectedIndex.value
        targetItem = filteredResults.value[idx]
      }
    }
    if (targetItem?.path) {
      router.push(targetItem.path)
      closeSearch()
    }
  }

  // 快捷键处理
  const handleGlobalKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }
    if (e.key === 'Escape' && isVisible.value) {
      closeSearch()
    }
    if (e.key === 'Enter' && isVisible.value) {
      handleSelect()
    }
  }

  // 监听选中项变化 → 触发滚动
  watch(selectedIndex, (newIndex) => {
    if (newIndex >= 0) {
      onScrollToIndex(newIndex)
    }
  })

  // 生命周期：绑定全局快捷键
  onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeydown)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
  })

  return {
    // 状态
    isVisible,
    query,
    selectedIndex,
    filteredResults,

    // 方法
    openSearch,
    closeSearch,
    handleInput,
    moveUp,
    moveDown,
    handleSelect,
  }
}
