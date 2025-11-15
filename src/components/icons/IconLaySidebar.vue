<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 48"
    :width="size"
    :height="size"
    fill="none"
  >
    <!-- 侧边栏 -->
    <rect x="0" y="0" width="16" height="48" rx="1" :fill="color" fill-opacity="0.9" />

    <!-- 顶部菜单 -->
    <rect x="18" y="0" width="38" height="10" rx="1" :fill="color" fill-opacity="0.7" />

    <!-- 主内容区 -->
    <rect x="18" y="12" width="38" height="34" rx="1" :fill="color" fill-opacity="0.4" />
  </svg>
</template>

<script>
export default {
  name: 'IconLayoutSidebar',
  props: {
    color: {
      type: String,
      default: 'currentColor',
    },
    size: {
      type: [Number, String],
      default: 24,
    },
  },
}
</script>