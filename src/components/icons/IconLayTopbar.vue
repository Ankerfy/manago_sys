<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 48"
    :width="size"
    :height="size"
    fill="none"
  >
    <g>
      <!-- 最上方的短条 -->
      <rect x="0" y="0" width="56" height="10" rx="1" :fill="color" fill-opacity="0.9" />

      <!-- 中间的中等条 -->
      <rect x="0" y="12" width="56" height="8" rx="1" :fill="color" fill-opacity="0.7" />

      <!-- 最下方的长条 -->
      <rect x="0" y="22" width="56" height="24" rx="1" :fill="color" fill-opacity="0.4" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'CustomSvgIcon',
  props: {
    color: {
      type: String,
      default: 'currentColor', // 默认使用当前字体颜色
    },
    size: {
      type: [Number, String],
      default: 24, // 默认尺寸
    },
  },
}
</script>