<script lang="ts" setup>
import LayAside from '@/layout/LayAside.vue'
import LayHeader from '@/layout/LayHeader.vue'
import LayCarousel from '@/layout/LayCarousel.vue'
import { useAppStore, useUIStore } from '@/stores'

const hotSearches = ['热搜1', '热搜2', '热搜3']

// 获取折叠、加载状态
const appStore = useAppStore()
const uiStore = useUIStore()
const { isSidebarCollapse } = storeToRefs(appStore)
const { isLoading } = storeToRefs(uiStore)

// 刷新
const route = useRoute()
const routeKey = ref(route.fullPath)

const handleRefresh = async () => {
  uiStore.start()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  routeKey.value = `${route.fullPath}?t=${Date.now()}`
  console.log('routeKey', routeKey.value)
  uiStore.finish()
}
</script>

<template>
  <div class="common-layout min-h-screen relative" :class="isSidebarCollapse ? 'sidebar-collapse' : ''">
    <!-- 侧边菜单栏（脱离文档流） -->
    <div
      class="lay-sidebar fixed top-0 left-0 h-screen z-100 overflow-hidden bg-[#545c64] shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
      <LayAside />
    </div>
    <!-- 主容器：仅包含 header + main -->
    <el-container class="lay-main-container min-h-screen">
      <!-- 头部 -->
      <el-header class="lay-header p-0! h-12! bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] z-99 fixed top-0">
        <LayHeader @refresh="handleRefresh" />
      </el-header>
      <!-- 热搜走马灯 -->
      <div class="lay-hot-search fixed top-12 h-10 z-98 bg-white">
        <LayCarousel />
      </div>
      <!-- 主体内容 -->
      <el-main class="p-2.5! mt-22.5 border-2 border-gray-300 rounded-lg overflow-y-auto overflow-x-hidden">
        <!-- 页面加载时显示骨架屏 -->
        <el-skeleton v-if="isLoading" animated :rows="10" style="padding: 20px" />
        <!-- 页面加载完成后显示真实内容 -->
        <RouterView v-else :key="routeKey" />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
/* 布局根容器 */
.common-layout {
  background-color: var(--color-bg-overlay, #f8f8f8);
  --sidebar-width: 200px;
  --sidebar-collapsed-width: 63px;
  --transition-speed: 0.3s;
}

.lay-sidebar {
  width: var(--sidebar-width);
  transition: width var(--transition-speed) ease;
}

.common-layout.sidebar-collapse .lay-sidebar {
  width: var(--sidebar-collapsed-width);
}

.lay-main-container {
  margin-left: var(--sidebar-width);
  transition: margin-left var(--transition-speed) ease;
}

.common-layout.sidebar-collapse .lay-main-container {
  margin-left: var(--sidebar-collapsed-width);
}

.lay-header {
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  transition: left var(--transition-speed) ease, width var(--transition-speed) ease;
}

.common-layout.sidebar-collapse .lay-header {
  left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

.lay-hot-search {
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  transition: left var(--transition-speed) ease, width var(--transition-speed) ease;
}

.common-layout.sidebar-collapse .lay-hot-search {
  left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}
</style>@/stores/app-store