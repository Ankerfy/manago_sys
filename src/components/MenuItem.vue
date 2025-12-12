<!-- @/components/MenuItem.vue -->
<script lang="ts" setup>
import type { MenuItem as MenuItemType } from '@/types/menu'
import {
  House,
  DataLine,
  Monitor,
  OfficeBuilding,
  Film,
  ChatLineSquare,
  Headset,
  Location,
  InfoFilled,
} from '@element-plus/icons-vue'

// 泛型 比type: Object 更精确
const props = defineProps<{ item: MenuItemType }>()

// 图标映射表
const iconMap: Record<string, Component> = {
  House,
  DataLine,
  Monitor,
  OfficeBuilding,
  Film,
  ChatLineSquare,
  Headset,
  Location,
  InfoFilled,
}

const getIconComponent = (iconName: string): Component | null => {
  return iconMap[iconName] || null
}
</script>

<template>
  <!-- 单个菜单项 -->
  <el-menu-item v-if="!item.submenu" :index="item.index">
    <el-icon v-if="item.icon && getIconComponent(item.icon)">
      <component :is="iconMap[item.icon]" />
    </el-icon>
    <template #title>{{ item.title }}</template>
  </el-menu-item>

  <!-- 子菜单 -->
  <el-sub-menu v-else :index="item.index">
    <template #title>
      <!-- iconMap[item.icon] -->
      <el-icon v-if="item.icon && getIconComponent(item.icon)">
        <component :is="iconMap[item.icon]" />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <!-- :key="idx" -->
    <menu-item v-for="(child, idx) in item.submenu" :key="`${item.index}-${idx}`" :item="child" />
  </el-sub-menu>
</template>

