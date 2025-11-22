<!-- @/components/MenuItem.vue -->
<script setup>
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

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// 图标映射表
const iconMap = {
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

const getIconComponent = (iconName) => {
  return iconMap[iconName] || null
}
</script>

<template>
  <!-- 单个菜单项 -->
  <el-menu-item v-if="!item.submenu" :index="item.index">
    <el-icon v-if="item.icon && iconMap[item.icon]">
      <component :is="getIconComponent(item.icon)" />
    </el-icon>
    <template #title>{{ item.title }}</template>
  </el-menu-item>

  <!-- 子菜单 -->
  <el-sub-menu v-else :index="item.index">
    <template #title>
      <el-icon v-if="item.icon && iconMap[item.icon]">
        <component :is="getIconComponent(item.icon)" />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <menu-item v-for="(child, idx) in item.submenu" :key="idx" :item="child" />
  </el-sub-menu>
</template>

