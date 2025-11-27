<script setup>
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
const routeKey = ref(useRoute.fullPath)

const handleRefresh = async () => {
  uiStore.start()
  await new Promise((resolve) => setTimeout(resolve, 1500))
  routeKey.value = useRoute.fullPath + '?t=' + Date.now()
  uiStore.finish()

  // 模拟数据加载时间
  setTimeout(() => {
    routeKey.value = useRoute.fullPath + '?t=' + Date.now()
    console.log('routeKey', routeKey.value)
    uiStore.finish()
  }, 1200)
}
</script>

<template>
  <div class="common-layout" :class="{ 'sidebar-collapse': isSidebarCollapse }">
    <!-- 侧边菜单栏（脱离文档流） -->
    <div class="lay-sidebar">
      <LayAside />
    </div>
    <!-- 主容器：仅包含 header + main -->
    <el-container class="lay-main-container">
      <!-- 头部 -->
      <el-header class="lay-header">
        <LayHeader @refresh="handleRefresh" />
      </el-header>
      <!-- 热搜走马灯 -->
      <div class="lay-hot-search">
        <LayCarousel />
      </div>
      <!-- 主体内容 -->
      <el-main class="lay-main-content">
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
  min-height: 100vh;
  position: relative; /* 重要：为 fixed 子元素提供上下文 */
  background-color: var(--color-bg-overlay, #f8f8f8);
  --sidebar-width: 200px;
  --sidebar-collapsed-width: 63px;
  --transition-speed: 0.3s;
}

/* 侧边栏（独立 fixed） */
.lay-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  z-index: 100;
  transition: width var(--transition-speed) ease;
  overflow-x: hidden;
  background-color: #545c64;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
}
.common-layout.sidebar-collapse .lay-sidebar {
  width: var(--sidebar-collapsed-width);
}

/* 主容器 el-container 默认 display:flex */
.lay-main-container {
  min-height: 100vh;
  margin-left: var(--sidebar-width);
  transition: margin-left var(--transition-speed) ease;
}
.common-layout.sidebar-collapse .lay-main-container {
  margin-left: var(--sidebar-collapsed-width);
}

/* 头部 */
.lay-header {
  padding: 0;
  height: 48px !important;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 99;
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  transition: left var(--transition-speed) ease, width var(--transition-speed) ease;
}
.common-layout.sidebar-collapse .lay-header {
  left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

/* 热搜走马灯 */
.lay-hot-search {
  position: fixed;
  top: 48px;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: 40px;
  background-color: var(--el-bg-color-overlay);
  z-index: 98;
  transition: left var(--transition-speed) ease, width var(--transition-speed) ease;
}
.common-layout.sidebar-collapse .lay-hot-search {
  left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

/* 主体内容区域 */
.lay-main-content {
  padding: 10px;
  margin-top: 90px;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>@/stores/app-store