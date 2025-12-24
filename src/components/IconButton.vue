<!-- @/components/IconButton.vue -->
<script lang="ts" setup>
defineProps({
  toolName: {
    type: String,
    default: 'Hello',
  },
  iconName: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 32,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <!-- 图标提示 -->
  <el-tooltip class="box-item" effect="dark" :content="toolName" placement="bottom">
    <el-icon :size="size" class="icon-button
        cursor-pointer
        p-2
        rounded
        transition-all
        duration-300
        focus:outline-none focus:ring-0
        hover:bg-gray-400
        dark:hover:bg-gray-700
        dark:hover:text-gray-200
      " :class="{
        'cursor-not-allowed opacity-50 pointer-events-none': disabled,
      }" @click="emit('click')">
      <component class="p-0.8" :is="iconName" />
    </el-icon>
  </el-tooltip>
</template>

<style scoped>
.icon-button:hover:not(.icon-button--disabled) {
  color: var(--color-text-icon);
  background-color: var(--vt-c-white-bg);
}
</style>