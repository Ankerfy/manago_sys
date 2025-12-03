<script lang="ts" setup>
import { useAppStore, useUIStore } from '@/stores'
import { useHeaderToolbar, type HeaderAction } from '@/composables/useHeaderToolbar'
import toolbarConfig from '@/config/toolbarConfig.json'
import SearchModal from '@/components/search/SearchModal.vue'
import IconButton from '@/components/IconButton.vue'
import UserAvatarPopover from '@/components/UserAvatarPopover.vue'
import ConfigPanel from '@/components/config-drawer/ConfigPanel.vue'

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

// 定义所有action键名
type LocalAction = HeaderAction | 'onRefreshClick'

const allActions: Record<LocalAction, () => void> = {
  ...actions,
  onRefreshClick,
}

// 定义toolbar配置项类型
interface ToolbarItem {
  id: string
  iconName: string | { open?: string; close?: string; dark?: string; light?: string }
  toolName: string | { open?: string; close?: string; dark?: string; light?: string }
  isDynamic?: boolean
  action?: LocalAction
}

// 解析工具项状态
const resolveItemState = (item: ToolbarItem) => {
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
const processedToolbar = computed(() => {
  const safeLeft = Array.isArray(toolbarConfig.toolbarLeft)
    ? (toolbarConfig.toolbarLeft as unknown as ToolbarItem[])
    : []
  const safeRight = Array.isArray(toolbarConfig.toolbarRight)
    ? (toolbarConfig.toolbarRight as unknown as ToolbarItem[])
    : []

  return {
    left: safeLeft.map((item) => ({
      ...item,
      ...resolveItemState(item),
    })),
    right: safeRight.map((item) => ({
      ...item,
      ...resolveItemState(item),
    })),
  }
})
</script>

<template>
  <div class="menu-nav">
    <div class="nav-left">
      <div class="toolkits-left-icon">
        <!-- 菜单折叠、刷新 -->
        <IconButton v-for="item in processedToolbar.left" :key="item.id" :icon-name="item.currentIcon"
          :tool-name="item.currentToolName" @click="item.action && allActions[item.action]?.()" />
      </div>

      <!-- 面包屑 -->
      <div class="toolkits-left-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>home</el-breadcrumb-item>
          <el-breadcrumb-item>user_manager</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="nav-right">
      <!-- 搜索框 -->
      <div class="toolkits-right-search">
        <SearchModal />
      </div>

      <!-- 工具项 -->
      <div class="toolkits-right-tools">
        <div class="tools-l">
          <IconButton v-for="item in processedToolbar.right" :key="item.id" :icon-name="item.currentIcon"
            :tool-name="item.currentToolName" @click="item.action && allActions[item.action]?.()" />
        </div>
        <!-- 头像 -->
        <div class="tools-r">
          <!-- <el-avatar :size="32" :src="avatarUrl" /> -->
          <UserAvatarPopover :avatar-url="avatarUrl" :avatar-size="32" />
        </div>
      </div>

      <!-- 右侧抽屉、消息通知 -->
      <div v-show="showPopover" class="toolkits-right-message"></div>
      <div class="toolkits-right-drawer">
        <!-- 抽屉组件 -->
        <ConfigPanel v-model="showPanel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-nav {
  height: 48px;
  /* background-color: var(--color-bg-menu-nav); */
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

/* 左侧 */
.nav-left {
  display: flex;
  width: 300px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.toolkits-left-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toolkits-left-breadcrumb {
  padding: 5px;
}

/* 右侧 */
.nav-right {
  display: flex;
  justify-content: space-between;
  /* background-color: #ccc; */
  gap: 10px;
  --toolkits-right-tools-width: 300px;
  --toolkits-right-search-width: 150px;
}

.toolkits-right-search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--toolkits-right-search-width);
  /* background-color: red; */
}

.toolkits-right-tools {
  display: flex;
  gap: 10px;
  width: var(--toolkits-right-tools-width);
}

.tools-l {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  /* background-color: bisque; */
}

.tools-r {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
  padding: 0 10px;
  /* background-color: chocolate; */
}
</style>@/stores/app-store