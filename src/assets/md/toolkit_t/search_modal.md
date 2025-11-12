太好了！你现在希望 **将之前的搜索组件升级为支持真实搜索结果展示**，并实现如下效果：

---

#### ✅ 目标效果（根据你提供的新截图）

| 特征                                                      | 说明 |
| --------------------------------------------------------- | ---- |
| ✅ 输入 `da` → 显示匹配菜单项                             |
| ✅ 搜索结果包含：图标、中文名称、英文名（如 `dashboard`） |
| ✅ 顶部显示分类标签（如“菜单导航”）                       |
| ✅ 结果项可高亮/选中（鼠标悬停或键盘导航）                |
| ✅ 右上角显示结果总数（如 `共 4 项结果`）                 |
| ✅ 底部保留快捷键提示                                     |

---

在原有 `SearchModal.vue` 的基础上进行 **功能增强与样式优化**，使其完全匹配你的需求。

---

##### ✅ 更新版 `SearchModal.vue` template模板

```vue
<template>
  <!-- 搜索触发按钮 -->
  <SearchBox @click="openSearch" />

  <!-- 搜索遮罩层 + 卡片 -->
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="search-overlay"
      @click="closeSearch"
      @keydown.esc="closeSearch"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div class="search-card" @click.stop>
        <!-- 搜索输入框 -->
        <div class="search-header">
          <div class="search-icon">🔍</div>
          <input
            ref="searchInputRef"
            v-model="query"
            type="text"
            placeholder="搜索导航菜单..."
            class="search-input"
            @input="handleInput"
            @keydown.enter="handleSelect"
            @keydown.up.prevent="moveUp"
            @keydown.down.prevent="moveDown"
          />
          <button @click="closeSearch" class="close-btn" aria-label="关闭搜索">
            <el-icon><CloseBold /></el-icon>
          </button>
        </div>

        <!-- 搜索结果区 -->
        <div v-if="!query.trim()" class="search-plac">
          <div class="icon">🔍</div>
          <p>输入关键词搜索菜单</p>
        </div>
        <div v-else class="search-results">
          <!-- 分类标题 -->
          <div v-if="filteredResults.length > 0" class="category-header">
            <span>
              <el-icon><Menu /></el-icon> 菜单导航
            </span>
            <span class="count">({{ filteredResults.length }})</span>
          </div>

          <!-- 结果列表 -->
          <ul class="result-list">
            <li
              v-for="(item, index) in filteredResults"
              :key="item.id"
              :class="{ selected: selectedIndex === index }"
              @click="handleSelect(item)"
              @mouseenter="hoverIndex = index"
              @mouseleave="hoverIndex = -1"
            >
              <div class="icon">{{ item.icon }}</div>
              <div class="title">{{ item.name }}</div>
              <div class="desc">{{ item.desc }}</div>
            </li>

            <!-- 无结果 -->
            <li v-if="filteredResults.length === 0 && query.trim()" class="no-result">
              未找到相关结果
            </li>
          </ul>
        </div>

        <!-- 底部操作提示 -->
        <div class="search-footer">
          <div class="search-hint">
            <kbd>↑</kbd> <kbd>↓</kbd> 导航 &nbsp; <kbd>Enter</kbd> 选择 &nbsp; <kbd>ESC</kbd> 关闭
          </div>
          <span class="result-count" v-if="filteredResults.length > 0">
            共 {{ filteredResults.length }} 项结果
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
```

---

##### ✅ 配套js

```vue
<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import SearchBox from './SearchBox.vue'

// 响应式状态
const isVisible = ref(false)
const query = ref('')
const searchInputRef = ref(null)

// 模拟菜单数据（后续接口获取或json配置读取）
const menuData = [
  { id: 1, name: '仪表盘', desc: 'dashboard', icon: '📊' },
  { id: 2, name: '日期选择器', desc: 'date', icon: '📅' },
  { id: 3, name: '多模态表单', desc: 'form-modal', icon: '📄' },
  { id: 4, name: '日历', desc: 'calendar', icon: '🗓️' },
  // ...更多菜单项
]

// 筛选结果
const filteredResults = computed(() => {
  if (!query.value.trim()) return []
  return menuData.filter(
    (item) => item.name.includes(query.value) || item.desc.includes(query.value),
  )
})

// 键盘导航状态
const selectedIndex = ref(-1)
const hoverIndex = ref(-1)

// 打开搜索
const openSearch = () => {
  isVisible.value = true
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

// 关闭搜索
const closeSearch = () => {
  isVisible.value = false
  query.value = ''
  selectedIndex.value = -1
}

// 输入处理（实时过滤）
const handleInput = () => {
  selectedIndex.value = -1 // 清除选中
  hoverIndex.value = -1
}

// 键盘导航上下键移动
const moveUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}
const moveDown = () => {
  const max = filteredResults.value.length - 1
  if (selectedIndex.value < max) {
    selectedIndex.value++
  }
}

// 选择列表项
const handleSelect = (item) => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
  // closeSearch()
}

// 快捷键监听
const handleGlobalKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
  if (e.key === 'Escape' && isVisible.value) {
    closeSearch()
  }
}

// 生命周期
onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>
```

---

##### ✅ 配套css样式

```CSS
<style scoped>
/* 遮罩层 */
.search-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0009, #0006);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 搜索卡片 */
.search-card {
  width: 500px;
  max-width: 80vw;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e6e6e6;
}

/* 搜索输入框区域 */
.search-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  font-size: 14px;
  color: #666;
}
.search-icon {
  margin-right: 5px;
}
.search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  background: transparent;
}
.close-btn {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}
.close-btn:hover {
  color: var(--color-text-icon);
  background-color: var(--vt-c-white-bg);
  border-radius: 4px;
}

/* 搜索提示 */
.search-plac {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #666;
}
.search-plac .icon {
  font-size: 24px;
  margin-bottom: 12px;
}

/* 搜索结果区 */
.search-results {
  max-height: 300px;
  overflow-y: auto;
  padding: 0 10px;
}

/* 分类标题 */
.category-header {
  display: flex;
  padding: 12px 14px;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  border-radius: 10px;
  justify-content: space-between;
  background: #f8f9fa;
  margin-bottom: 2px;
}

/* 结果列表 */
.result-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.result-list li {
  display: flex;
  align-items: center;
  padding: 12px 10px;
  color: #999;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  margin-bottom: 2px;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.result-list li:hover,
.result-list li.selected {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  transform: translate(2px);
  box-shadow: 0 2px 8px #6366f11a, 0 1px, 3px, #0000000d;
}

/* 列表项内容 */
.result-list .icon {
  font-size: 1rem;
  min-width: 1rem;
}
.result-list .title {
  color: #333;
}
.result-list .desc {
  font-size: 12px;
}
.no-result {
  padding: 16px;
  text-align: center;
}

/* 底部操作提示 */
.search-footer {
  padding: 12px 16px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## ✅ 功能亮点

| 功能                      | 实现方式                        |
| ------------------------- | ------------------------------- |
| 🔍 实时模糊搜索           | `includes()` 匹配中文/英文      |
| 🎯 键盘导航（上下箭头）   | `selectedIndex` 控制高亮        |
| 🖱️ 鼠标悬停高亮           | `@mouseenter` 切换 `hoverIndex` |
| 💬 图标 + 中文 + 英文描述 | 支持自定义 `menuData`           |
| 🧩 分类标题 + 数量统计    | `category-header` + `count`     |
| 📝 底部提示               | 快捷键说明 + 结果数量           |
| ⌨️ Ctrl+K 快捷键          | 全局监听，支持 macOS            |
| 🚫 ESC 关闭               | 支持键盘和点击遮罩关闭          |

---

## 🔄 如何扩展？

你可以将 `menuData` 替换为真实数据源：

```js
// 示例：从 API 获取菜单
const fetchMenuData = async () => {
  const res = await api.get('/menu')
  return res.data
}
```

或者使用 `Fuse.js` 实现更智能的模糊匹配：

```bash
npm install fuse.js
```

```js
import Fuse from 'fuse.js'
const fuse = new Fuse(menuData, { keys: ['name', 'desc'] })
const filteredResults = computed(() => fuse.search(query.value).map((r) => r.item))
```

---

## ✅ 最终效果对比

| 你提供的图            | 本组件实现 |
| --------------------- | ---------- |
| ✅ 输入 `da` 显示结果 | ✅         |
| ✅ 图标 + 中文 + 英文 | ✅         |
| ✅ 分类标题           | ✅         |
| ✅ 结果数量           | ✅         |
| ✅ 高亮选中           | ✅         |
| ✅ 快捷键提示         | ✅         |
| ✅ 滚动条             | ✅         |

---

如果你希望我进一步添加：

- 多级菜单支持（展开子菜单）
- 搜索历史记录
- 自动补全建议
- 按类型分组（如“页面”、“组件”）

也可以继续告诉我！我会为你逐项实现。
