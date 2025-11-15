<!-- @/components/config-drawer/AppearanceConfig.vue -->
<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

// 接收父组件传入的完整配置
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

// 本地响应式副本（避免直接修改 props）
const localThemeMode = ref(props.modelValue.themeMode)
const localThemeColor = ref(props.modelValue.themeColor)
const localBorderRadius = ref(props.modelValue.borderRadius)
const localEnableAnimation = ref(props.modelValue.enableAnimation)
const localAnimationType = ref(props.modelValue.animationType)
const selectedPreset = ref(props.modelValue.selectedPreset)

// 同步本地变化到父组件
watch(
  () => ({
    themeMode: localThemeMode.value,
    themeColor: localThemeColor.value,
    borderRadius: localBorderRadius.value,
    enableAnimation: localEnableAnimation.value,
    animationType: localAnimationType.value,
    selectedPreset: selectedPreset.value,
  }),
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  { deep: true }
)

// 预设数据
const presets = [
  { name: '科技蓝', color: '#409eff', icon: '💙' },
  { name: '清新绿', color: '#40c9ff', icon: '💚' },
  { name: '商务灰', color: '#606266', icon: '🖤' },
  { name: '活力橙', color: '#f56c6c', icon: '❤️' },
  { name: '优雅紫', color: '#807dfe', icon: '💜' },
  { name: '经典红', color: '#e64c4c', icon: '❤️' },
]

const predefineColors = [
  '#409eff',
  '#f56c6c',
  '#67c23a',
  '#1890ff',
  '#909399',
  '#f6e58d',
  '#e64c4c',
  '#807dfe',
  '#40c9ff',
  '#606266',
]

const selectPreset = (index) => {
  selectedPreset.value = index
  localThemeColor.value = presets[index].color
}
</script>

<template>
  <div class="config-section">
    <h3>快速预设</h3>
    <p class="subtitle">一键应用预设主题方案</p>

    <div class="preset-grid">
      <div
        v-for="(preset, index) in presets"
        :key="index"
        class="preset-item"
        :class="{ active: selectedPreset === index }"
        @click="selectPreset(index)"
      >
        <div class="icon">{{ preset.icon }}</div>
        <div class="name">{{ preset.name }}</div>
        <div class="color-dot" :style="{ backgroundColor: preset.color }"></div>
      </div>
    </div>
  </div>

  <div class="config-section">
    <h3>主题模式</h3>
    <el-radio-group v-model="localThemeMode" size="small">
      <el-radio-button label="light">浅色</el-radio-button>
      <el-radio-button label="dark">深色</el-radio-button>
      <el-radio-button label="auto">自动</el-radio-button>
    </el-radio-group>
  </div>

  <div class="config-section">
    <h3>圆角大小</h3>
    <el-radio-group v-model="localBorderRadius" size="small">
      <el-radio-button label="4px">小 (4px)</el-radio-button>
      <el-radio-button label="6px">中 (6px)</el-radio-button>
      <el-radio-button label="8px">大 (8px)</el-radio-button>
    </el-radio-group>
  </div>

  <div class="config-section">
    <h3>页面动画</h3>
    <div class="toggle-row">
      <el-switch v-model="localEnableAnimation" active-text="启用动画" />
    </div>
    <div class="animation-type" v-if="localEnableAnimation">
      <el-radio-group v-model="localAnimationType" size="small">
        <el-radio-button label="fade">淡入</el-radio-button>
        <el-radio-button label="slide">滑动</el-radio-button>
        <el-radio-button label="scale">缩放</el-radio-button>
        <el-radio-button label="none">无</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<style scoped>
/* 可复用公共样式，也可单独提取 */
.config-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.subtitle {
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
}
.preset-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.preset-item {
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.preset-item.active {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.icon {
  font-size: 24px;
  margin-bottom: 8px;
}
.name {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}
.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
}
.toggle-row {
  margin: 12px 0;
}
.animation-type {
  margin-top: 8px;
}
</style>