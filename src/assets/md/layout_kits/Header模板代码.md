### ✅ `Header` 头部工具栏代码（Vue 3 + `<script setup>` + Element Plus）

#### ✅ 配套 JS

```vue
<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import SearchBox from '../SearchBox.vue'

const emit = defineEmits(['refresh'])

const avatarUrl = ref('https://gcore.jsdelivr.net/gh/Ankerfy/blog_pics/images/202509231451856.jpg')

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)
const toggleSidebar = () => {
  appStore.toggleSidebar()
}

// 刷新点击
const onRefreshClick = () => {
  emit('refresh')
}

// 搜索点击
const onSearchClick = () => {
  console.log('搜索被点击了')
  // 显示弹窗
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
        <el-icon @click="onRefreshClick()" :size="18">
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

    <div class="nav-right">
      <!-- 搜索框 -->
      <div class="toolkits-right-search">
        <SearchBox @click="onSearchClick" />
      </div>

      <!-- 工具项 -->
      <div class="toolkits-right-tools">
        <div class="tools-l">
          <el-icon :size="16">
            <House />
          </el-icon>
          <el-icon :size="16">
            <Headset />
          </el-icon>
          <el-icon :size="16">
            <Sunny v-if="isDark" />
            <Moon v-else />
          </el-icon>
          <el-icon :size="16">
            <FullScreen />
          </el-icon>
          <el-icon :size="16">
            <Bell />
          </el-icon>
          <el-icon :size="16">
            <Setting />
          </el-icon>
        </div>
        <!-- 头像 -->
        <div class="tools-r">
          <el-avatar :size="32" :src="avatarUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
```

---

#### ✅ 配套 CSS 样式

```CSS
.menu-nav {
  height: 48px;
  /* background-color: var(--color-bg-menu-nav); */
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

/* 左侧 */
.nav-left {
  display: flex;
  width: 300px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.toolkits-left-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}
.toolkits-left-icon > .el-icon {
  cursor: pointer;
  padding: 5px;
}
.toolkits-left-icon > .el-icon:hover,
.tools-l > .el-icon:hover {
  color: var(--color-text-icon);
  transition: all 0.3s ease;
  background-color: var(--vt-c-white-bg);
}

.toolkits-left-breadcrumb {
  padding: 5px;
}

/* 右侧 */
.nav-right {
  display: flex;
  justify-content: space-between;
  /* background-color: #ccc; */
  gap: 10px;
  --toolkits-right-tools-width: 300px;
  --toolkits-right-search-width: 150px;
}

.toolkits-right-search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--toolkits-right-search-width);
  /* background-color: red; */
}

.toolkits-right-tools {
  display: flex;
  gap: 10px;
  width: var(--toolkits-right-tools-width);
}

.tools-l {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  /* background-color: bisque; */
}
.tools-l > .el-icon {
  cursor: pointer;
  padding: 5px;
}

.tools-r {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
  padding: 0 10px;
  /* background-color: chocolate; */
}
```
