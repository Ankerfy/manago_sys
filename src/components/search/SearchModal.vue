<!-- @/components/search/SearchModal.vue -->
<script lang="ts" setup>
import SearchBox from './SearchBox.vue'
import IconButton from '@/components/IconButton.vue'
import rawMenuConfig from '@/config/menu.json'
import router from '@/router'
import { useGlobalSearch } from '@/composables/useGlobalSearch'

const hoverIndex = ref(-1)

// 类型定义
interface MenuItem {
  title: string
  index?: string
  icon?: string
  submenu?: MenuItem[]
}

interface FlattendItem {
  id: string
  name: string
  desc: string
  icon?: string
  path: string
}

// 扁平化菜单 .split('/').pop() || ''
const flattenMenu = (items: MenuItem[], parent: MenuItem | null = null): FlattendItem[] => {
  let result: FlattendItem[] = []
  for (const item of items) {
    if (item.index?.startsWith('/')) {
      result.push({
        id: item.index,
        name: item.title,
        desc: item.index,
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

const searchInputRef = ref<HTMLInputElement | null>(null)
const resultItemRef = ref<HTMLElement[]>([])

// 滚动回调
const scrollToIndex = (index: number) => {
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

watch(
  () => filteredResults.value.length,
  (newLen) => {
    resultItemRef.value.length = newLen
  },
  {
    flush: 'post',
  }
)
</script>

<template>
  <!-- 搜索触发按钮 -->
  <SearchBox @click="openSearch" />

  <!-- 搜索遮罩层 + 卡片 -->
  <Teleport to="body">
    <div v-if="isVisible" class="search-overlay fixed inset-0 z-\[9999] 
    flex items-center justify-center outline-none
    font-mono md:font-serif antialiased
    " @click="closeSearch" @keydown.esc="closeSearch" tabindex="-1" role="dialog" aria-modal="true">
      <div class="w-full max-w-125 max-h-[90vh]
      bg-white rounded-xl
      border border-gray-200
      shadow-lg
      overflow-hidden
      focus:outline-none
      " @click.stop>
        <!-- 搜索输入框 -->
        <div class="flex items-center px-4 py-3 bg-gray-100
        border-b border-gray-200 text-sm text-gray-700">
          <div class="mr-0.5">🔍</div>
          <input ref="searchInputRef" v-model="query" type="text" placeholder="搜索导航菜单..."
            class="flex-1 bg-transparent outline-none border-none px-3 py-2" @keydown.up.prevent="moveUp"
            @keydown.down.prevent="moveDown" autofocus />
          <button @click="closeSearch" class="p-1 rounded-sm hover:bg-gray-100 hover:text-[#3892ec] 
            cursor-pointer transition-colors duration-150" aria-label="关闭搜索">
            <el-icon>
              <CloseBold />
            </el-icon>
          </button>
        </div>

        <!-- 搜索提示（空状态） -->
        <div v-if="!query.trim()" class="flex flex-col items-center justify-center p-10 text-gray-400">
          <div class="text-2xl mb-4">🔍</div>
          <p>输入关键词搜索菜单</p>
        </div>
        <!-- 搜索结果区 -->
        <div v-else class="max-h-75 overflow-y-auto px-2.5 py-1">
          <!-- 分类标题 -->
          <div v-if="filteredResults.length > 0" class="flex items-center justify-between px-3.5 py-2
            bg-gray-200 rounded-lg text-xs text-gray-600 mb-1.5 mt-1">
            <span>
              <el-icon class="inline mr-1 align-text-center">
                <Menu />
              </el-icon> 菜单导航
            </span>
            <span class="font-medium text-red-800">({{ filteredResults.length }})</span>
          </div>

          <!-- 结果列表  -->
          <ul class="result-list list-none m-0 p-0">
            <li v-for="(item, index) in filteredResults" :key="item.id"
              :ref="(el: any) => { if (el) resultItemRef[index] = el }" class="flex items-center gap-2 px-1 py-1.5 text-sm text-gray-500 
              rounded-xl border-b border-gray-200 
              cursor-pointer transition-all duration-200 mb-2" :class="{ selected: selectedIndex === index }"
              @click="handleSelect(item)" 
              @mouseenter="hoverIndex = index" 
              @mouseleave="hoverIndex = -1" 
              role="option"
              :aria-selected="selectedIndex === index">
              <div class="text-base min-w-4 mt-0.5">
                <IconButton class="" :icon-name="item.icon || 'default-icon'" />
              </div>
              <div class="flex-1">{{ item.name }}</div>
              <div class="text-xs">{{ item.desc }}</div>
            </li>

            <!-- 无结果，静态展示 -->
            <div v-if="filteredResults.length === 0 && query.trim()"
            class="p-10 text-center text-gray-400 border-b border-gray-100 last:border-b-0"
            >
              未找到相关结果
            </div>
          </ul>
        </div>

        <!-- 底部操作提示 -->
        <div
          class="flex items-center justify-between bg-gray-50 border-t border-gray-200 px-4 py-3 text-xs text-gray-600">
          <div>
            <kbd>↑</kbd> <kbd>↓</kbd> 导航 &nbsp; <kbd>Enter</kbd> 选择 &nbsp; <kbd>ESC</kbd> 关闭
          </div>
          <span v-if="filteredResults.length > 0">
            共 {{ filteredResults.length }} 项结果
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.search-overlay {
  background: linear-gradient(135deg, #0009, #0006);
}

.result-list li:hover,
.result-list li.selected {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  transform: translate(2px);
  box-shadow: 0 2px 8px #6366f11a, 0 1px, 3px, #0000000d;
}
</style>