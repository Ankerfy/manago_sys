<!-- @/components/search/SearchModal.vue -->
<script setup>
import { ref, nextTick } from 'vue'
import SearchBox from './SearchBox.vue'
import IconButton from '@/components/IconButton.vue'
import rawMenuConfig from '@/config/menu.json'
import router from '@/router'
import { useGlobalSearch } from '@/composables/useGlobalSearch'

// 扁平化菜单
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

const searchInputRef = ref(null)
const resultItemRef = ref([])

// 滚动回调
const scrollToIndex = (index) => {
  const el = resultItemRef.value[index]
  if (el) {
    el.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
  }
}

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
  scrollToIndex
)
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
        <!-- 搜索输入框 @input="handleInput"
            @keydown.enter="handleSelect" -->
        <div class="search-header">
          <div class="search-icon">🔍</div>
          <input
            ref="searchInputRef"
            v-model="query"
            type="text"
            placeholder="搜索导航菜单..."
            class="search-input"
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

          <!-- 结果列表  -->
          <ul class="result-list">
            <li
              v-for="(item, index) in filteredResults"
              :key="item.id"
              :ref="(el) => (resultItemRef[index] = el)"
              :class="{ selected: selectedIndex === index }"
              @click="handleSelect(item)"
              @mouseenter="hoverIndex = index"
              @mouseleave="hoverIndex = -1"
            >
              <div class="icon">
                <IconButton :icon-name="item.icon" />
              </div>
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
  top: -550px;
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