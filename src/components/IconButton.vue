<!-- src/components/IconButton.vue -->
<script setup>
defineProps({
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
  <el-icon
    class="icon-button"
    :size="size"
    :class="{ 'icon-button--disabled': disabled }"
    @click="emit('click')"
  >
    <el-tooltip class="box-item" effect="dark" :content="iconName" placement="bottom">
      <component :is="iconName" />
    </el-tooltip>
  </el-icon>
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
</style>