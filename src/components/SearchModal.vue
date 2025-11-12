<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import SearchBox from './SearchBox.vue'

// 响应式状态
const isVisible = ref(false)
const query = ref('')
const searchInputRef = ref(null)

// 模拟搜索结果（可替换为真实数据）
const mockResults = computed(() => {
  if (!query.value.trim()) return []
  return [`菜单项: ${query.value}`, `功能: ${query.value} 设置`, `帮助文档 - ${query.value}`]
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

// 输入处理
const handleInput = () => {
  // 可添加 debounce 或 API 调用
}

// 回车提交
const handleSubmit = () => {
  if (mockResults.value.length > 0) {
    alert(`跳转至: ${mockResults.value[0]}`)
    closeSearch()
  }
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
        <!-- 输入框区域 -->
        <div class="search-header">
          <div class="search-icon">🔍</div>
          <input
            ref="searchInputRef"
            v-model="query"
            type="text"
            placeholder="搜索导航菜单..."
            class="search-input"
            @input="handleInput"
            @keydown.enter="handleSubmit"
          />
          <button @click="closeSearch" class="close-btn" aria-label="关闭搜索">
            <el-icon><CloseBold /></el-icon>
          </button>
        </div>

        <!-- 搜索内容区 -->
        <div class="search-content">
          <div class="search-placeholder">
            <div class="icon">🔍</div>
            <p>输入关键词搜索菜单</p>
          </div>
        </div>

        <!-- 底部操作提示 -->
        <div class="search-footer">
          <span class="action-item"> <kbd>↵</kbd> 选择 </span>
          <span class="action-item"> <kbd>↑↓</kbd> 导航 </span>
          <span class="action-item"> <kbd>ESC</kbd> 关闭 </span>
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

/* 输入框区域 */
.search-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #f8f9fa;
}

.search-icon {
  margin-right: 8px;
  font-size: 14px;
  color: #666;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: #333;
}

.close-btn {
  margin-left: 8px;
  width: 20px;
  height: 20px;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

/* 搜索内容区 */
.search-content {
  padding: 40px 24px;
  text-align: center;
  background: #f9f9f9;
}

.search-placeholder {
  color: #999;
  font-size: 14px;
}

.search-placeholder .icon {
  font-size: 24px;
  margin-bottom: 12px;
}

/* 底部操作提示 */
.search-footer {
  padding: 12px 16px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  font-size: 12px;
  color: #666;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-item kbd {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-family: monospace;
}

/* 触发按钮 */
.search-trigger {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>