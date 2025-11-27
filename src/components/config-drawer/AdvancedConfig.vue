<!-- @/components/config-drawer/AdvancedConfig.vue -->
<script setup>
const emit = defineEmits(['update:modelValue', 'reset-all'])

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const localEnableShortcuts = ref(props.modelValue.enableShortcuts)

watch(localEnableShortcuts, (val) => {
  emit('update:modelValue', { enableShortcuts: val })
})
</script>

<template>
  <div class="config-section">
    <h3>配置管理</h3>
    <el-button type="text" @click="emit('reset-all')">
      <el-icon><Refresh /></el-icon>
      重置所有配置
    </el-button>
  </div>

  <div class="config-section">
    <h3>快捷键</h3>
    <el-form label-width="120px" size="small">
      <el-form-item label="启用快捷键">
        <el-switch v-model="localEnableShortcuts" />
      </el-form-item>
      <el-form-item label="打开设置面板">
        <span class="shortcut-key">Ctrl + K</span>
      </el-form-item>
      <el-form-item label="切换深浅模式">
        <span class="shortcut-key">Ctrl + Shift + D</span>
      </el-form-item>
      <el-form-item label="重置配置">
        <span class="shortcut-key">Ctrl + Shift + R</span>
      </el-form-item>
    </el-form>
  </div>

  <div class="config-section">
    <h3>关于</h3>
    <div class="version-info">
      <p><strong>配置版本：</strong> <span>1.0.0</span></p>
      <p><strong>项目版本：</strong> <span>1.0.0</span></p>
    </div>
  </div>
</template>

<style scoped>
.config-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.version-info {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
}
.shortcut-key {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f7ff;
  border: 1px solid #d9ecff;
  border-radius: 6px;
  font-size: 12px;
  color: #1890ff;
}
</style>