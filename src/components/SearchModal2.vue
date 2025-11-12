<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import SearchBox from './SearchBox.vue'

// 响应式状态
const isVisible = ref(false)
const query = ref('')
const searchInputRef = ref(null)

// 模拟搜索结果（实际项目中替换为 API 或本地数据过滤）
const mockResults = computed(() => {
  if (!query.value.trim()) return []
  return [`结果 1: ${query.value}`, `结果 2: ${query.value} 设置`, `帮助文档 - ${query.value}`]
})

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
}

// 输入处理（可替换为 debounce + 搜索逻辑）
const handleInput = () => {
  // 实际项目中可在此调用搜索函数，例如：
  // debouncedSearch(query.value);
}

// 回车提交（跳转/选择）
const handleSubmit = () => {
  if (mockResults.value.length > 0) {
    alert(`你选择了: ${mockResults.value[0]}`)
    closeSearch()
  }
}

// 快捷键监听
const handleGlobalKeydown = (e) => {
  // Ctrl+K (Windows/Linux) 或 Cmd+K (macOS)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
  // ESC 关闭（额外保险，因 overlay 已绑定 @keydown.esc）
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
  <!-- 搜索触发按钮（通常放在 Header 中） -->
  <SearchBox @click="openSearch" />

  <!-- 遮罩层 + 搜索卡片 -->
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
        <div class="search-header">
          <input
            ref="searchInputRef"
            v-model="query"
            type="text"
            placeholder="输入关键词搜索..."
            class="search-input"
            @input="handleInput"
            @keydown.enter="handleSubmit"
          />
          <button @click="closeSearch" class="close-btn" aria-label="关闭搜索">
            <el-icon><CloseBold /></el-icon>
          </button>
        </div>
        <div class="search-results">
          <p v-if="!query.trim()">请输入关键词以搜索菜单、页面或功能</p>
          <ul v-else>
            <!-- 示例：模拟搜索结果 -->
            <li v-for="(item, index) in mockResults" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="search-hint">
          <kbd>↑</kbd> <kbd>↓</kbd> 导航 &nbsp; <kbd>Enter</kbd> 选择 &nbsp; <kbd>ESC</kbd> 关闭
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
  width: min(600px, 95vw);
  max-height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-header {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
}

.close-btn {
  margin-left: 12px;
  width: 32px;
  height: 32px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.search-results {
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5;
}

.search-results p {
  color: #888;
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.search-hint {
  padding: 12px 16px;
  background: #f9f9f9;
  font-size: 12px;
  color: #888;
  text-align: center;
}

/* .search-trigger {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
} */
</style>