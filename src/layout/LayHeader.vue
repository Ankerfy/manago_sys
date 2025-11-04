<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import SearchBox from '@/components/SearchBox.vue'
import IconButton from '@/components/IconButton.vue'

const emit = defineEmits(['refresh'])
const isDark = ref(false)
const avatarUrl = ref('https://gcore.jsdelivr.net/gh/Ankerfy/blog_pics/images/202509231451856.jpg')

// 切换折叠
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)
const toggleSidebar = () => appStore.toggleSidebar()
const onRefreshClick = () => emit('refresh') // 刷新点击

// 搜索点击
const onSearchClick = () => {
  console.log('搜索被点击了')
  // 显示弹窗
}
</script>

<template>
  <div class="menu-nav">
    <div class="nav-left">
      <div class="toolkits-left-icon">
        <!-- 控制折叠状态图标 -->
        <IconButton :icon-name="isSidebarCollapse ? 'Expand' : 'Fold'" @click="toggleSidebar()" />
        <IconButton icon-name="RefreshRight" @click="onRefreshClick()" />
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
        <SearchBox @click="onSearchClick" />
      </div>

      <!-- 工具项 -->
      <div class="toolkits-right-tools">
        <div class="tools-l">
          <IconButton icon-name="House" />
          <IconButton icon-name="Headset" />
          <IconButton :icon-name="isDark ? 'Sunny' : 'Moon'" @click="isDark = !isDark" />
          <IconButton icon-name="FullScreen" />
          <IconButton icon-name="Bell" />
          <IconButton icon-name="Setting" />
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