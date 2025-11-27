<!-- @/components/config-drawer/ConfigPanel.vue -->
<script setup>
import AppearanceConfig from './AppearanceConfig.vue'
import LayoutConfig from './LayoutConfig.vue'
import AdvancedConfig from './AdvancedConfig.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '主题配置',
  },
  size: {
    type: String,
    default: '350px',
  },
})
const emit = defineEmits(['update:modelValue'])

const visible = ref(false)

// 同步外部 modelValue 变化到内部 visible
watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal
  },
  { immediate: true }
)

// ✅ 必须声明 activeTab
const activeTab = ref('appearance')

const config = reactive({
  appearance: {
    selectedPreset: 0,
    themeMode: 'light',
    themeColor: '#409eff',
    borderRadius: '6px',
    enableAnimation: true,
    animationType: 'slide',
  },
  layout: {
    selectedLayout: 0,
    showBreadcrumb: true,
    showBreadcrumbIcon: true,
    showTabs: true,
    showFooter: true,
    sidebarWidth: 220,
    headerHeight: 56,
  },
  advanced: {
    enableShortcuts: true,
  },
})

const updateConfig = (section, partial) => {
  Object.assign(config[section], partial)
}

const resetLayoutDefaults = () => {
  config.layout = {
    selectedLayout: 0,
    showBreadcrumb: true,
    showBreadcrumbIcon: true,
    showTabs: true,
    showFooter: true,
    sidebarWidth: 220,
    headerHeight: 56,
  }
}

const resetAllConfig = () => {
  config.appearance = {
    selectedPreset: 0,
    themeMode: 'light',
    themeColor: '#409eff',
    borderRadius: '6px',
    enableAnimation: true,
    animationType: 'slide',
  }
  resetLayoutDefaults()
  config.advanced = { enableShortcuts: true }
}

const handleClose = () => {
  emit('update:modelValue', false)
  // done()
}
</script>

<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :size="size"
    direction="rtl"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="外观" name="appearance">
        <AppearanceConfig
          :model-value="config.appearance"
          @update:model-value="updateConfig('appearance', $event)"
        />
      </el-tab-pane>
      <el-tab-pane label="布局" name="layout">
        <LayoutConfig
          :model-value="config.layout"
          @update:model-value="updateConfig('layout', $event)"
          @reset-layout="resetLayoutDefaults"
        />
      </el-tab-pane>
      <el-tab-pane label="高级" name="advanced">
        <AdvancedConfig
          :model-value="config.advanced"
          @update:model-value="updateConfig('advanced', $event)"
          @reset-all="resetAllConfig"
        />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>