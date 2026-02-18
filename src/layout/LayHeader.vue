<script lang="ts" setup>
import { useAppStore, useUIStore } from '@/stores'
import { useHeaderToolbar } from '@/composables/useHeaderToolbar'
import toolbarConfig from '@/config/toolbarConfig.json'
import SearchModal from '@/components/search/SearchModal.vue'
import IconButton from '@/components/IconButton.vue'
import UserAvatarPopover from '@/components/UserAvatarPopover.vue'
import ConfigPanel from '@/components/config-drawer/ConfigPanel.vue'
import type {
  ToolbarAction,
  ToolbarItem,
  ProcessedToolbarItem,
  ProcessedToolbar
} from '@/types/components'

interface Emits {
  (e: 'refresh'): void
}
const emit = defineEmits<Emits>()
const avatarUrl = ref('https://gcore.jsdelivr.net/gh/Ankerfy/blog_pics/images/202509231451856.jpg')

// Store相关
const appStore = useAppStore()
const uiStore = useUIStore()
const { isSidebarCollapse, darkMode } = storeToRefs(appStore)
const { showPopover, showPanel } = storeToRefs(uiStore)
const enableShortcuts = ref(true)

// 快捷工具
const { actions } = useHeaderToolbar()

const onRefreshClick = () => emit('refresh')
const allActions: Record<ToolbarAction, () => void> = {
  ...actions,
  onRefreshClick,
}

// 解析工具项状态
const resolveItemState = (item: ToolbarItem): Pick<ProcessedToolbarItem, 'currentIcon' | 'currentToolName'> => {
  if (!item.isDynamic) {
    return {
      currentIcon: typeof item.iconName === 'string' ? item.iconName : '',
      currentToolName: typeof item.toolName === 'string' ? item.toolName : '',
    }
  }

  // 动态项
  if (item.id === 'collapse') {
    const isOpen = isSidebarCollapse.value
    const iconNames = item.iconName as { open: string; close: string }
    const toolNames = item.toolName as { open: string; close: string }
    return {
      currentIcon: isOpen ? iconNames.open ?? '' : iconNames.close ?? '',
      currentToolName: isOpen ? toolNames.open ?? '' : toolNames.close ?? '',
    }
  }

  if (item.id === 'theme') {
    const isDark = darkMode.value
    const iconNames = item.iconName as { dark?: string; light?: string }
    const toolNames = item.toolName as { dark?: string; light?: string }
    return {
      currentIcon: isDark ? iconNames.dark ?? '' : iconNames.light ?? '',
      currentToolName: isDark ? toolNames.dark ?? '' : toolNames.light ?? '',
    }
  }

  return {
    currentIcon: typeof item.iconName === 'string' ? item.iconName : '',
    currentToolName: typeof item.toolName === 'string' ? item.toolName : '',
  }
}

// 响应式处理
const processedToolbar = computed<ProcessedToolbar>(() => {
  // JSON类型断言
  const leftItems = (toolbarConfig.toolbarLeft || []) as ToolbarItem[]
  const rightItems = (toolbarConfig.toolbarRight || []) as ToolbarItem[]

  return {
    left: leftItems.map((item) => ({
      ...item,
      ...resolveItemState(item),
    })),
    right: rightItems.map((item) => ({
      ...item,
      ...resolveItemState(item),
    })),
  }
})
</script>

<template>
  <div class="transition-all duration-800 menu-nav flex h-12 justify-between pl-2.5 font-mono md:font-serif antialiased">
    <!-- 左侧：在sm及以上显示 -->
    <div class="nav-left hidden sm:flex w-75 items-center gap-2.5">
      <div class="toolkits-left-icon flex items-center gap-0.5">
        <!-- 菜单折叠、刷新 -->
        <IconButton v-for="item in processedToolbar.left" :key="item.id" :icon-name="item.currentIcon"
          :tool-name="item.currentToolName" @click="item.action && allActions[item.action]?.()" />
      </div>

      <!-- 面包屑 -->
      <div class="toolkits-left-breadcrumb p-1.5">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>home</el-breadcrumb-item>
          <el-breadcrumb-item>user_manager</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="nav-right flex justify-between sm:justify-center gap-2.5">
      <!-- 搜索框 -->
      <div class="toolkits-right-search w-37.5 flex items-center justify-center">
        <SearchModal />
      </div>

      <!-- 工具项 + 头像 -->
      <div class="flex">
        <!-- 工具项：仅在sm及以上显示 -->
        <div class="hidden sm:flex toolkits-right-tools w-75 gap-0.5">
          <div class="tools-l flex w-[80%] items-center justify-evenly">
            <IconButton v-for="item in processedToolbar.right" :key="item.id" :icon-name="item.currentIcon"
              :tool-name="item.currentToolName" @click="item.action && allActions[item.action]?.()" />
          </div>
          <!-- 头像 -->
          <div class="tools-r flex w-[20%] items-center justify-start px-1.5">
            <UserAvatarPopover :avatar-url="avatarUrl" :avatar-size="32" />
          </div>
        </div>
        <!-- 移动端：仅显示头像 -->
        <div class="sm:hidden flex items-center">
          <UserAvatarPopover :avatar-url="avatarUrl" :avatar-size="32" />
        </div>
      </div>

      <!-- 右侧抽屉、消息通知 -->
      <div v-show="showPopover" class="shrink-0"></div>
      <div class="shrink-0">
        <!-- 抽屉组件 -->
        <ConfigPanel v-model="showPanel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .menu-nav {
  background-color: #ccc;
}

.toolkits-left-icon {
  background-color: greenyellow;
}

.toolkits-left-breadcrumb {
  background-color: pink;
}

.toolkits-right-search {
  background-color: red;
}

.tools-l {
  background-color: bisque;
}

.tools-r {
  background-color: chocolate;
} */
</style>@/stores/app-store@/types/components/toolbar