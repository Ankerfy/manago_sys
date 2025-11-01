### ✅ `Header` 头部工具栏代码（Vue 3 + `<script setup>` + Element Plus）

#### ✅ 配套 JS

```vue
<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['refresh'])

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)
const toggleSidebar = () => {
  appStore.toggleSidebar()
}

// 刷新通知
const handleRefresh = () => {
  emit('refresh')
}
</script>
```

---

#### ✅ 配套 模板html结构

```vue
<template>
  <div class="menu-nav">
    <div class="nav-left">
      <div class="toolkits-left-icon">
        <!-- 控制折叠状态图标 -->
        <el-icon @click="toggleSidebar()" :size="18">
          <Fold v-if="!isSidebarCollapse" />
          <Expand v-else />
        </el-icon>
        <el-icon @click="handleRefresh()" :size="18">
          <RefreshRight />
        </el-icon>
      </div>

      <!-- 面包屑 -->
      <div class="toolkits-left-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>home</el-breadcrumb-item>
          <el-breadcrumb-item>user_manager</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="nav-right"></div>
  </div>
</template>
```

---

#### ✅ 配套 CSS 样式

```CSS
.menu-nav {
  height: 48px;
  background-color: var(--color-bg-menu-nav);
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.nav-left {
  display: flex;
  width: 300px;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

.toolkits-left-icon {
  display: flex;
  align-items: center;
  padding: 5px;
  /* margin-left: 10px; */
  gap: 15px;
}
.toolkits-left-icon > .el-icon {
  cursor: pointer;
}

.toolkits-left-breadcrumb {
  padding: 5px;
}

.nav-right {
  width: 600px;
  background-color: #ccc;
}
```
