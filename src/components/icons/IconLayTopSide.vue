<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 48"
    :width="size"
    :height="size"
    fill="none"
  >
    <!-- 左侧菜单栏 -->
    <rect x="0" y="0" width="8" height="48" rx="1" :fill="color" fill-opacity="0.9" />

    <!-- 顶部导航栏 -->
    <rect x="10" y="0" width="46" height="10" rx="1" :fill="color" fill-opacity="0.7" />

    <!-- 主内容区域 -->
    <rect x="10" y="12" width="46" height="34" rx="1" :fill="color" fill-opacity="0.4" />
  </svg>
</template>

<script>
export default {
  name: 'IconLayoutSideMixed',
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