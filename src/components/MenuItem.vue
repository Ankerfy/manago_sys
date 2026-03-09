<!-- @/components/MenuItem.vue -->
<script lang="ts" setup>
import type { ApiRouteRecord } from '@/types/api/router'
import {
  House,
  DataLine,
  Monitor,
  InfoFilled,
} from '@element-plus/icons-vue'

// 泛型 比type: Object 更精确
const props = defineProps<{ item: ApiRouteRecord }>()

// 图标映射表
const iconMap: Record<string, Component> = {
  House,
  DataLine,
  Monitor,
  InfoFilled,
}

// const getIconComponent = (iconName: string): Component | null => {
//   return iconMap[iconName] || null
// }

const getIcon = (iconName?: string) => {
  if (!iconName || !iconMap[iconName as keyof typeof iconMap]) {
    return null
  }
  return iconMap[iconName as keyof typeof iconMap] || null
}
</script>

<template>
  <!-- 无子菜单的菜单项 -->
  <el-menu-item v-if="!item.children" :index="item.path">
    <el-icon v-if="getIcon(item.meta.icon)">
      <component :is="getIcon(item.meta.icon)" />
    </el-icon>
    <template #title>{{ item.meta.title }}</template>
  </el-menu-item>

  <!-- 含子菜单的菜单项 -->
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon v-if="getIcon(item.meta.icon)">
        <component :is="getIcon(item.meta.icon)" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <!-- 递归渲染子菜单项 -->
    <menu-item v-for="child in item.children" :key="child.id || child.path" :item="child" />
  </el-sub-menu>
</template>

@/types/components/menu