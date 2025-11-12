你提出的问题非常典型，涉及 **键盘导航与滚动同步** 以及 **循环导航（wrap-around）** 的实现细节。我们来逐项修复：

---

## ✅ 问题分析

1. **向下无法跟随滚动**  
   → 当选中项超出可视区域时，没有自动滚动到该元素。

2. **下移到最后一项后继续按 ↓ 无法回到第一项（即不支持循环）**  
   → 需要实现“环绕式”导航：最后一项再按 ↓ 跳回第一项，反之亦然。

---

## ✅ 解决方案

我们将做两件事：

### ✅ 1. 在 `moveUp` / `moveDown` 中实现 **循环导航**

### ✅ 2. 每次改变 `selectedIndex` 后，**自动滚动选中项到可视区域**

---

## 🔧 修改后的关键逻辑（替换原有 script 部分）

```vue
<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

const isVisible = ref(false)
const query = ref('')
const searchInputRef = ref(null)
const resultItemsRef = ref([]) // 用于获取每个结果 DOM

// 模拟菜单数据
const menuData = [
  { id: 1, name: '仪表盘', desc: 'dashboard', icon: '📊' },
  { id: 2, name: '日期选择器', desc: 'date', icon: '📅' },
  { id: 3, name: '多模态表单', desc: 'form-modal', icon: '📄' },
  { id: 4, name: '日历', desc: 'calendar', icon: '🗓️' },
  { id: 5, name: '用户管理', desc: 'users', icon: '👥' },
  { id: 6, name: '设置', desc: 'settings', icon: '⚙️' },
  { id: 7, name: '通知中心', desc: 'notifications', icon: '🔔' },
  { id: 8, name: '帮助文档', desc: 'help', icon: '❓' },
]

const filteredResults = computed(() => {
  if (!query.value.trim()) return []
  return menuData.filter(
    (item) => item.name.includes(query.value) || item.desc.includes(query.value),
  )
})

const selectedIndex = ref(-1)

// 打开搜索
const openSearch = () => {
  isVisible.value = true
  nextTick(() => {
    searchInputRef.value?.focus()
    selectedIndex.value = -1 // 重置
  })
}

// 关闭搜索
const closeSearch = () => {
  isVisible.value = false
  query.value = ''
  selectedIndex.value = -1
}

// 输入处理
const handleInput = () => {
  selectedIndex.value = -1
}

// 👇 核心：滚动选中项到视图中
const scrollToSelected = () => {
  if (selectedIndex.value < 0) return
  const el = resultItemsRef.value[selectedIndex.value]
  if (el) {
    el.scrollIntoView({
      block: 'nearest', // 或 'center'，根据 UI 偏好
      behavior: 'smooth', // 可选：平滑滚动
    })
  }
}

// 监听 selectedIndex 变化，自动滚动
watch(selectedIndex, scrollToSelected)

// 👇 循环导航：向下
const moveDown = () => {
  const len = filteredResults.value.length
  if (len === 0) return

  if (selectedIndex.value === -1) {
    selectedIndex.value = 0
  } else {
    selectedIndex.value = (selectedIndex.value + 1) % len
  }
}

// 👇 循环导航：向上
const moveUp = () => {
  const len = filteredResults.value.length
  if (len === 0) return

  if (selectedIndex.value === -1) {
    selectedIndex.value = len - 1
  } else {
    selectedIndex.value = (selectedIndex.value - 1 + len) % len
  }
}

// 选择项目
const handleSelect = (item) => {
  if (!item) {
    // 如果是 Enter 但未选中，默认选第一个
    if (filteredResults.value.length > 0) {
      item = filteredResults.value[selectedIndex.value === -1 ? 0 : selectedIndex.value]
    } else {
      return
    }
  }
  alert(`跳转至: ${item.name}`)
  closeSearch()
}

// 全局快捷键
const handleGlobalKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
  if (e.key === 'Escape' && isVisible.value) {
    closeSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>
```

---

## 🛠️ 模板部分：为每个 `<li>` 添加 `ref`

在 `<li>` 上绑定 `ref`，以便 JS 获取 DOM：

```vue
<ul class="result-list">
  <li
    v-for="(item, index) in filteredResults"
    :key="item.id"
    :ref="el => resultItemsRef[index] = el"  <!-- 👈 关键 -->
    :class="{ 'selected': selectedIndex === index }"
    @click="handleSelect(item)"
    @mouseenter="selectedIndex = index"
  >
    <div class="icon">{{ item.icon }}</div>
    <div class="title">{{ item.name }}</div>
    <div class="desc">{{ item.desc }}</div>
  </li>

  <li v-if="filteredResults.length === 0 && query.trim()" class="no-result">
    未找到相关菜单
  </li>
</ul>
```

> 💡 注意：`resultItemsRef` 是一个数组，通过函数式 ref 绑定每个元素。

---

## ✅ 最终效果

| 行为           | 效果                       |
| -------------- | -------------------------- |
| 按 ↓ 到底部    | 自动回到第一项（循环）     |
| 按 ↑ 到顶部    | 自动跳到最后一个（循环）   |
| 选中项超出视口 | 自动滚动到可视区域         |
| 鼠标悬停       | 临时高亮（不影响键盘索引） |
| Enter 无选中   | 默认选第一个               |

---

## 🎯 可选优化建议

- 使用 `block: 'center'` 让选中项居中显示（更显眼）
- 禁用 `smooth` 滚动以获得更快响应（设为 `'auto'`）
- 若性能敏感，可用 `requestAnimationFrame` 包裹 `scrollIntoView`

---

如果你希望我帮你整合成完整文件，或适配 TypeScript / Pinia / Vue Router 跳转，也可以继续告诉我！
