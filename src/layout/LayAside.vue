<script lang="ts" setup>
import { useAppStore } from '@/stores'
import MenuItem from '@/components/MenuItem.vue'
import type { MenuItem as MenuItemType } from '@/types/menu'

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)

// Logo 图片地址
const logoUrl = ref<string>(new URL('@/assets/logo.svg', import.meta.url).href)
const picFit = 'contain'

const menuItems = ref<MenuItemType[]>([])
// 加载菜单配置

async function loadMenuConfig() {
  try {
    const module = await import('@/config/menu.json')
    // 兼容两种格式     Vite 会将 .json 作为默认导出 { default: ... }
    const data = module.default?.menuItems || module.menuItems || []
    menuItems.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to load menu config:', error)
    menuItems.value = []  // 保证默认值, 避免菜单项丢失
  }
}

onMounted(() => {
  loadMenuConfig()
})
</script>

<template>
  <div class="flex flex-col font-mono md:font-serif antialiased" :class="isSidebarCollapse ? 'w-16' : 'w-50'">
    <!-- 侧边栏头部 :class="isSidebarCollapse ? 'px-4' : 'px-4'" -->
    <div class="flex items-center h-12 px-4 py-0! transition-all duration-300 gap-3">
      <div class="w-8 h-8">
        <el-image class="w-full h-full object-contain" :src="logoUrl" :fit="picFit" alt="Logo" />
      </div>
      <span v-show="!isSidebarCollapse"
        class="text-lg font-semibold text-white whitespace-nowrap flex-1 transition-discrete">ManaGo_SYS</span>
    </div>

    <!-- 菜单区域 -->
    <div class="flex-1 overflow-y-auto">
      <el-menu :default-active="$route.path" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
        class="el-menu-vertical-demo border-r-0!" :collapse="isSidebarCollapse" :collapse-transition="false"
        :unique-opened="true" router>
        <MenuItem v-for="(item, index) in menuItems" :key="index" :item="item" />
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
.el-menu--collapse {
  transition: width 0.3s ease, left 0.3s ease;
}
</style>@/stores/app-store