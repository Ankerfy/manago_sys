<script setup>
import { ref } from 'vue'
import LayAside from '@/components/layout/LayAside.vue'
import LayHeader from '@/components/layout/LayHeader.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)

const hotSearches = ['热搜1', '热搜2', '热搜3']
</script>

<template>
  <div class="common-layout" :class="{ 'sidebar-collapse': !isSidebarCollapse }">
    <el-container>
      <!-- 侧边栏 width="200px" -->
      <el-aside>
        <LayAside />
      </el-aside>

      <!-- 主容器 -->
      <el-container class="lay-main-container">
        <!-- 头部 -->
        <el-header class="lay-header">
          <LayHeader />
        </el-header>

        <!-- 热搜走马灯 -->
        <div class="lay-hot-search">
          <el-icon class="bell-icon"><Bell /></el-icon>
          <el-carousel height="40px" direction="vertical" :autoplay="true">
            <el-carousel-item v-for="item in hotSearches" :key="item.index">
              <span>{{ item }}</span>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 主体内容 -->
        <el-main class="lay-main-content">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
/* ========== 布局根容器 ========== */
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-overlay, #f8f8f8);
  --sidebar-width: 200px;
  --sidebar-collapsed-width: 63px;
  --transition-speed: 0.3s;
}

/* ========== 侧边栏 ========== */
.lay-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  z-index: 100;
  transition: width var(--transition-speed) ease;
  overflow-x: hidden;
  background-color: #fff;
  border-right: 1px solid #eaeaea;
}

/* 侧边栏折叠状态 */
.common-layout.sidebar-collapse .lay-sidebar {
  width: var(--sidebar-collapsed-width);
}

/* ========== 主容器 ========== */
.lay-main-container {
  display: flex;
  margin-left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  flex: 1;
  flex-direction: column;
  transition: margin-left var(--transition-speed) ease, width var(--transition-speed) ease;
}

/* 当整体处于 collapse 状态时，主容器变窄 */
.common-layout.sidebar-collapse .lay-main-container {
  margin-left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

/* ========== 头部 ========== */
.lay-header {
  padding: 0;
  width: calc(100% - var(--sidebar-width));
  position: fixed;
  left: var(--sidebar-width);
  height: 48px;
  z-index: 99;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: left var(--transition-speed) ease, width var(--transition-speed) ease;
}

.common-layout.sidebar-collapse .lay-header {
  left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

/* ========== 热搜走马灯 ========== */
.lay-hot-search {
  display: flex;
  height: 40px;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  padding: 0 10px;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #cdcdcd;
  background-color: var(--el-bg-color-overlay);
  position: fixed;
  top: 48px;
  z-index: 98;
  transition: left var(--transition-speed) ease, width var(--transition-speed) ease;
}

.common-layout.sidebar-collapse .lay-hot-search {
  left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

/* 走马灯文字样式 */
.bell-icon {
  margin: 0 4px;
  padding: 10px;
}

.el-carousel__item span {
  color: #475669;
  opacity: 0.75;
  line-height: 40px;
  margin: 0;
  text-align: center;
  font-size: 14px;
}

/* ========== 主体内容区域 ========== */
.lay-main-content {
  flex: 1;
  border: 2px solid #cdcdcd;
  margin-top: 90px;
  /* margin-left: var(--sidebar-width); */
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  border-radius: 8px;
  /* 注意：lay-main-content 在 lay-main-container 内，已继承宽度，无需额外设置 */
}
</style>