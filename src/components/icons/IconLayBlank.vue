<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 48"
    :width="size"
    :height="size"
    fill="none"
  >
    <!-- 顶部菜单 -->
    <rect x="0" y="0" width="56" height="10" rx="1" :fill="color" fill-opacity="0.9" />

    <!-- 主内容区（左侧） -->
    <rect x="0" y="12" width="42" height="34" rx="1" :fill="color" fill-opacity="0.4" />

    <!-- 右侧边栏 -->
    <rect x="44" y="12" width="12" height="34" rx="1" :fill="color" fill-opacity="0.7" />
  </svg>
</template>

<script>
export default {
  name: 'IconLayoutTopSide',
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