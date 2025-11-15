<!-- IconLayoutSplit.vue -->
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 48"
    :width="size"
    :height="size"
    fill="none"
  >
    <g>
      <!-- 左上 -->
      <rect x="0" y="0" width="24" height="20" rx="2" :fill="color" fill-opacity="0.9" />
      <!-- 右上 -->
      <rect x="32" y="0" width="24" height="20" rx="2" :fill="color" fill-opacity="0.7" />
      <!-- 左下 -->
      <rect x="0" y="24" width="24" height="20" rx="2" :fill="color" fill-opacity="0.6" />
      <!-- 右下 -->
      <rect x="32" y="24" width="24" height="20" rx="2" :fill="color" fill-opacity="0.4" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconLayoutSplit',
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