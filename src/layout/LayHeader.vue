<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { useHeaderToolbar } from '@/composables/useHeaderToolbar'
import toolbarConfig from '@/config/toolbarConfig.json'
import SearchModal from '@/components/SearchModal.vue'
import IconButton from '@/components/IconButton.vue'

const emit = defineEmits(['refresh'])
const avatarUrl = ref('https://gcore.jsdelivr.net/gh/Ankerfy/blog_pics/images/202509231451856.jpg')

// 切换折叠
const appStore = useAppStore()
const { isSidebarCollapse, darkMode } = storeToRefs(appStore)

// 快捷工具
const { actions } = useHeaderToolbar()

const onRefreshClick = () => emit('refresh')

const allActions = {
  ...actions,
  onRefreshClick,
}

// 解析工具项状态
const resolveItemState = (item) => {
  if (!item.isDynamic) {
    return {
      currentIcon: item.iconName,
      currentToolName: item.toolName,
    }
  }

  // 动态项
  if (item.id === 'collapse') {
    const isOpen = isSidebarCollapse.value
    return {
      currentIcon: isOpen ? item.iconName.open : item.iconName.close,
      currentToolName: isOpen ? item.toolName.open : item.toolName.close,
    }
  }

  if (item.id === 'theme') {
    const isDark = darkMode.value
    return {
      currentIcon: isDark ? item.iconName.dark : item.iconName.light,
      currentToolName: isDark ? item.toolName.dark : item.toolName.light,
    }
  }

  return {
    currentIcon: item.iconName,
    currentToolName: item.toolName,
  }
}

// 响应式处理
const processedToolbar = computed(() => ({
  left: toolbarConfig.toolbarLeft.map((item) => ({
    ...item,
    ...resolveItemState(item),
  })),
  right: toolbarConfig.toolbarRight.map((item) => ({
    ...item,
    ...resolveItemState(item),
  })),
}))
</script>

<template>
  <div class="menu-nav">
    <div class="nav-left">
      <div class="toolkits-left-icon">
        <!-- 菜单折叠、刷新 -->
        <IconButton
          v-for="item in processedToolbar.left"
          :key="item.id"
          :icon-name="item.currentIcon"
          :tool-name="item.currentToolName"
          @click="allActions[item.action]?.()"
        />
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
          <IconButton
            v-for="item in processedToolbar.right"
            :key="item.id"
            :icon-name="item.currentIcon"
            :tool-name="item.currentToolName"
            @click="allActions[item.action]?.()"
          />
        </div>
        <!-- 头像 -->
        <div class="tools-r">
          <el-avatar :size="32" :src="avatarUrl" />
        </div>
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
</style>