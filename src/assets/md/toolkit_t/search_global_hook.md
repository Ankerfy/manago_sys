你当前的代码结构清晰、逻辑完整，非常适合封装！我们可以将 **搜索核心逻辑**（状态、导航、快捷键、过滤、跳转）抽象为一个 **可复用的 Composable**（组合式函数），而将 **UI 相关部分**（如 `resultItemRef`、模板绑定）保留在组件中。

---

## ✅ 可封装内容分析

| 功能                                               | 是否可封装           | 说明                             |
| -------------------------------------------------- | -------------------- | -------------------------------- |
| `isVisible`, `query`, `selectedIndex` 等响应式状态 | ✅                   | 核心状态，应由 composable 管理   |
| `openSearch` / `closeSearch`                       | ✅                   | 通用行为                         |
| `filteredResults` 计算属性                         | ✅                   | 依赖 menuData 和 query           |
| 键盘导航（`moveUp`/`moveDown`）                    | ✅                   | 通用逻辑                         |
| `handleSelect` 跳转逻辑                            | ✅（需传入 router）  | 可配置化                         |
| 全局快捷键监听（Ctrl+K / ESC）                     | ✅（需生命周期钩子） | 可封装到 composable 中           |
| `scrollToSelected` + `watch(selectedIndex)`        | ⚠️ 部分可封装        | 滚动依赖 DOM ref，需外部传入回调 |
| `resultItemRef`                                    | ❌                   | 属于模板引用，必须在组件内       |

> ✅ 结论：**90% 的逻辑可以封装**，仅滚动和 DOM 引用需组件配合。

---

## 📦 封装方案：创建 `useGlobalSearch.js`

### 文件路径：`src/composables/useGlobalSearch.js`

```js
// src/composables/useGlobalSearch.js
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

/**
 * 全局搜索逻辑封装
 * @param {Array} menuData - 扁平化的菜单数据 [{ name, desc, path, icon }]
 * @param {Object} router - Vue Router 实例
 * @param {Function} onOpen - 搜索打开时回调（用于 focus input）
 * @param {Function} onScrollToIndex - 滚动到指定索引的回调（由组件实现）
 */
export function useGlobalSearch(menuData, router, onOpen = () => {}, onScrollToIndex = () => {}) {
  const isVisible = ref(false)
  const query = ref('')
  const selectedIndex = ref(-1)

  // 过滤结果
  const filteredResults = computed(() => {
    const q = query.value.trim()
    if (!q) return []
    return menuData.filter(
      (item) => item.name.includes(q) || item.desc?.includes(q) || item.path?.includes(q),
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
  const handleSelect = (item) => {
    if (!item) {
      if (filteredResults.value.length > 0) {
        item = filteredResults.value[selectedIndex.value === -1 ? 0 : selectedIndex.value]
      } else {
        return
      }
    }
    if (item.path) {
      router.push(item.path)
      closeSearch()
    }
  }

  // 快捷键处理
  const handleGlobalKeydown = (e) => {
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
```

---

## 🧩 在组件中使用封装后的逻辑

### 修改你的 `SearchModal.vue`（或类似组件）

```vue
<script setup>
import { ref, nextTick } from 'vue'
import SearchBox from './SearchBox.vue'
import rawMenuConfig from '@/config/sidebarMenu.json' // 你的原始菜单 JSON
import router from '@/router'
import { useGlobalSearch } from '@/composables/useGlobalSearch'

// 👇 扁平化菜单（可单独抽成 utils）
const flattenMenu = (items, parent = null) => {
  let result = []
  for (const item of items) {
    if (item.index?.startsWith('/')) {
      result.push({
        id: item.index,
        name: item.title,
        desc: item.index.split('/').pop(),
        icon: item.icon || parent?.icon,
        path: item.index,
      })
    }
    if (item.submenu) {
      result = result.concat(flattenMenu(item.submenu, item))
    }
  }
  return result
}

const menuData = flattenMenu(rawMenuConfig.menuItems)

// DOM refs
const searchInputRef = ref(null)
const resultItemRef = ref([])

// 滚动回调
const scrollToIndex = (index) => {
  const el = resultItemRef.value[index]
  if (el) {
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
}

// 使用封装的搜索逻辑
const {
  isVisible,
  query,
  selectedIndex,
  filteredResults,
  openSearch,
  closeSearch,
  handleInput,
  moveUp,
  moveDown,
  handleSelect,
} = useGlobalSearch(
  menuData,
  router,
  () => {
    searchInputRef.value?.focus()
  },
  scrollToIndex,
)
</script>

<template>
  <button @click="openSearch">🔍</button>

  <Teleport to="body">
    <div v-if="isVisible" @click="closeSearch" class="overlay">
      <div @click.stop class="search-card">
        <input
          ref="searchInputRef"
          v-model="query"
          @input="handleInput"
          @keydown.up.prevent="moveUp"
          @keydown.down.prevent="moveDown"
          @keydown.enter="handleSelect()"
        />

        <ul class="result-list">
          <li
            v-for="(item, index) in filteredResults"
            :key="item.id"
            :ref="(el) => (resultItemRef[index] = el)"
            :class="{ selected: selectedIndex === index }"
            @click="handleSelect(item)"
            @mouseenter="selectedIndex = index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>
```

---

## ✅ 封装后的好处

| 优势         | 说明                                             |
| ------------ | ------------------------------------------------ |
| **复用性强** | 任何需要全局搜索的地方都可调用 `useGlobalSearch` |
| **逻辑解耦** | 组件只关心 UI 和 DOM，业务逻辑集中在 composable  |
| **易于测试** | `useGlobalSearch` 可独立单元测试                 |
| **维护简单** | 修改搜索逻辑只需改一处                           |
| **配置灵活** | 支持不同 menuData / router 实例                  |

---

## 🔚 总结

你可以将以下内容 **全部封装进 `useGlobalSearch`**：

- 状态管理（`isVisible`, `query`, `selectedIndex`）
- 过滤逻辑
- 键盘导航（循环、上下）
- 快捷键监听（Ctrl+K / ESC）
- 路由跳转
- 生命周期绑定

**仅保留以下内容在组件内**：

- `searchInputRef` / `resultItemRef`（DOM 引用）
- 滚动实现（通过回调注入）
- 模板渲染

这样你的代码就达到了 **高内聚、低耦合、易维护** 的理想状态！

如需我帮你把 `flattenMenu` 也封装成工具函数，或支持异步菜单加载，也可以继续告诉我！
