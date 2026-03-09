<script lang="ts" setup>
import { useAppStore } from '@/stores'
import MenuItem from '@/components/MenuItem.vue'
import type { ApiRouteRecord } from '@/types/api/router'
import { menu } from '@/api'

const route = useRoute()

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)

// Logo 图片地址
const logoUrl = ref<string>(new URL('@/assets/logo.svg', import.meta.url).href)
const picFit = 'contain'

const menuItems = ref<ApiRouteRecord[]>([])

// 过滤菜单
const filterMenu = (routes: ApiRouteRecord[]): ApiRouteRecord[] => {
  return routes.filter(route => !route.meta.hidden).map(route => {
    // 递归过滤子菜单
    if (route.children && route.children.length) {
      route.children = filterMenu(route.children)
    }
    return route
  }).filter(route => {
    // 无有效子菜单则隐藏
    return !route.children || route.children.length > 0
  })
}

// 加载菜单配置
const loadMenuConfig = async () => {
  try {
    const menuList: ApiRouteRecord[] = await menu.getMenuList()
    // console.log('res.data:', menuList)

    // 过滤隐藏菜单
    menuItems.value = filterMenu(menuList)
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
    <div class="flex items-center h-12 px-4 py-0! transition-all duration-300 ease-linear gap-3">
      <div class="w-8 h-8">
        <el-image class="w-full h-full object-contain" :src="logoUrl" :fit="picFit" alt="Logo" />
      </div>
      <span v-show="!isSidebarCollapse"
        class="text-lg font-semibold text-white whitespace-nowrap flex-1 transition-discrete transition-all duration-300 ease-linear">ManaGo_SYS</span>
    </div>

    <!-- 菜单区域 -->
    <div class="flex-1 overflow-y-auto">
      <el-menu :default-active="$route.path" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
        class="el-menu-vertical-demo border-r-0!" :collapse="isSidebarCollapse" :collapse-transition="false"
        :unique-opened="true" router>
        <MenuItem v-for="item in menuItems" :key="item.id || item.path" :item="item" />
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
/* .el-menu--collapse {
  transition: width 0.3s ease, left 0.3s ease;
} */
</style>@/stores/app-store@/types/components/menu