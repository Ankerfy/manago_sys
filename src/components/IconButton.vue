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
    default: 16,
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
    <el-icon class="icon-button" :size="size" :class="{ 'icon-button--disabled': disabled }" @click="emit('click')">
      <component :is="iconName" />
    </el-icon>
  </el-tooltip>
</template>

<style scoped>
.icon-button {
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.icon-button:hover:not(.icon-button--disabled) {
  color: var(--color-text-icon);
  background-color: var(--vt-c-white-bg);
}

.icon-button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 移除所有可能聚焦边框*/
.icon-button:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>