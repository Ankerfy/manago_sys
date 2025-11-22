<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { storeToRefs } from 'pinia'
import MenuItem from '@/components/MenuItem.vue'

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)

// Logo 图片地址
const logoUrl = ref('')
const picFit = 'contain'

const menuItems = ref([])
// 加载菜单配置
async function loadMenuConfig() {
  try {
    const module = await import('@/config/menu.json')
    const data = JSON.parse(JSON.stringify(module.menuItems))
    menuItems.value = data
  } catch (error) {
    console.error('Failed to load menu config:', error)
  }
}

onMounted(() => {
  loadMenuConfig()
})
</script>

<template>
  <div class="sidebar">
    <!-- 侧边栏头部 -->
    <div class="sidebar-header" :class="{ 'is-collapse': isSidebarCollapse }">
      <div class="sidebar-logo">
        <el-image class="sidebar-logo-img" :src="logoUrl" :fit="picFit" alt="Logo" />
      </div>
      <span v-show="!isSidebarCollapse" class="sidebar-title">ManaGo_SYS</span>
    </div>

    <!-- 菜单区域 -->
    <div class="sidebar-menu">
      <el-menu
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        class="el-menu-vertical-demo"
        :collapse="isSidebarCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        router
      >
        <MenuItem v-for="(item, index) in menuItems" :key="index" :item="item" />
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, left 0.3s ease;
}

.sidebar-header {
  display: flex;
  height: 48px;
  /* background-color: red; */
  align-items: center;
  gap: 12px;
  transition: padding 0.3s ease;
  padding: 0 16px;
}

.sidebar-header.is-collapse {
  height: 48px;
  align-items: center;
  padding: 0 16px;
}

.sidebar-logo {
  width: 32px;
  height: 32px;
}

.sidebar-logo-img {
  width: 100%;
  height: 100%;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  flex: 1;
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
}

.el-menu--collapse {
  transition: width 0.3s ease, left 0.3s ease;
}
</style>@/stores/app-store