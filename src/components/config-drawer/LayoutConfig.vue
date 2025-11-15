<!-- @/components/config-drawer/LayoutConfig.vue -->
<script setup>
import { ref, watch } from 'vue'
import IconLaySidebar from '../icons/IconLaySidebar.vue'
import IconLayTopbar from '../icons/IconLayTopbar.vue'
import IconLaySideMixed from '../icons/IconLaySideMixed.vue'
import IconLayTopSide from '../icons/IconLayTopSide.vue'
import IconLayBlank from '../icons/IconLayBlank.vue'
import IconLaySplit from '../icons/IconLaySplit.vue'

const emit = defineEmits(['update:modelValue', 'reset-layout'])

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const localSelectedLayout = ref(props.modelValue.selectedLayout)
const localShowBreadcrumb = ref(props.modelValue.showBreadcrumb)
const localShowBreadcrumbIcon = ref(props.modelValue.showBreadcrumbIcon)
const localShowTabs = ref(props.modelValue.showTabs)
const localShowFooter = ref(props.modelValue.showFooter)
const localSidebarWidth = ref(props.modelValue.sidebarWidth)
const localHeaderHeight = ref(props.modelValue.headerHeight)

watch(
  () => ({
    selectedLayout: localSelectedLayout.value,
    showBreadcrumb: localShowBreadcrumb.value,
    showBreadcrumbIcon: localShowBreadcrumbIcon.value,
    showTabs: localShowTabs.value,
    showFooter: localShowFooter.value,
    sidebarWidth: localSidebarWidth.value,
    headerHeight: localHeaderHeight.value,
  }),
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  { deep: true }
)

const layoutModes = [
  { name: '左侧菜单', desc: '(默认)' },
  { name: '顶部菜单', desc: '(清爽)' },
  { name: '左侧混合', desc: '(灵巧)' },
  { name: '顶部混合', desc: '(侧优)' },
  { name: '内容主导', desc: '(沉浸)' },
  { name: '分栏布局', desc: '(高效)' },
]

const layoutIcons = [
  IconLaySidebar,
  IconLayTopbar,
  IconLaySideMixed,
  IconLayTopSide,
  IconLayBlank,
  IconLaySplit,
]

const selectLayout = (index) => {
  localSelectedLayout.value = index
}

const resetLayout = () => {
  emit('reset-layout')
}
</script>

<template>
  <div class="config-section">
    <h3>布局模式</h3>
    <div class="layout-grid">
      <div
        v-for="(layout, index) in layoutModes"
        :key="index"
        class="layout-item"
        :class="{ active: localSelectedLayout === index }"
        @click="selectLayout(index)"
      >
        <div class="layout-icon">
          <!-- 动态渲染对应的图标 -->
          <component :is="layoutIcons[index]" />
        </div>
        <div class="layout-name">{{ layout.name }}</div>
        <div class="layout-desc">{{ layout.desc }}</div>
      </div>
    </div>
  </div>

  <div class="config-section">
    <h3>界面元素</h3>
    <el-form label-width="120px" size="small">
      <el-form-item label="显示面包屑">
        <el-switch v-model="localShowBreadcrumb" />
      </el-form-item>
      <el-form-item label="显示面包屑图标">
        <el-switch v-model="localShowBreadcrumbIcon" />
      </el-form-item>
      <el-form-item label="显示标签页">
        <el-switch v-model="localShowTabs" />
      </el-form-item>
      <el-form-item label="显示页脚">
        <el-switch v-model="localShowFooter" />
      </el-form-item>
    </el-form>
  </div>

  <div class="config-section">
    <h3>尺寸调整</h3>
    <div class="slider-item">
      <span>侧边栏宽度</span>
      <el-slider
        v-model="localSidebarWidth"
        :min="180"
        :max="280"
        :step="2"
        show-input
        input-size="small"
      />
      <span class="value">{{ localSidebarWidth }}px</span>
    </div>
    <div class="slider-item">
      <span>头部高度</span>
      <el-slider
        v-model="localHeaderHeight"
        :min="48"
        :max="64"
        :step="1"
        show-input
        input-size="small"
      />
      <span class="value">{{ localHeaderHeight }}px</span>
    </div>
  </div>

  <div class="config-section">
    <el-button type="text" @click="resetLayout">
      <el-icon><Refresh /></el-icon>
      恢复布局默认设置
    </el-button>
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
.layout-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.layout-item {
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.layout-item:hover,
.layout-item.active {
  border-color: #1890ff;
  color: #1890ff;
  transform: translateY(-2px);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.layout-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.layout-name {
  font-size: 14px;
  color: #333;
  margin: 8px 0;
}
.layout-desc {
  font-size: 12px;
  color: #999;
}
.slider-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slider-item .value {
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
}
</style>