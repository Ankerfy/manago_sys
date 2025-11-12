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
  { id: 5, name: '日历1', desc: 'calendar1', icon: '🗓️' },
  { id: 6, name: '日历2', desc: 'calendar2', icon: '🗓️' },
  { id: 7, name: '日历3', desc: 'calendar3', icon: '🗓️' },
  { id: 8, name: '日历4', desc: 'calendar4', icon: '🗓️' },
]

// 筛选结果
const filteredResults = computed(() => {
  if (!query.value.trim()) return []
  return menuData.filter(
    (item) => item.name.includes(query.value) || item.desc.includes(query.value)
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
        <div class="search-results">
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

/* 搜索结果区 */
.search-results {
  max-height: 300px;
  overflow-y: auto;
  padding: 0 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

/* 滚动条自定义 */
.search-results::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}
.search-results::-webkit-scrollbar-track {
  background: transparent;
}
.search-results::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
.search-results::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.15);
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

/* 触发按钮 */
.search-trigger {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>