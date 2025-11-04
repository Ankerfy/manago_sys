### ✅ [优化版]`Header` 头部工具栏代码（Vue 3 + `<script setup>` + Element Plus）

你提出的两个优化方向非常合理：

1. **样式存在重复**：比如 `.toolkits-left-icon > .el-icon` 和 `.tools-l > .el-icon` 的 hover 样式几乎完全一致；
2. **左侧工具栏 icon 可封装**：多个 `<el-icon>` 重复使用相同结构（`cursor: pointer`、`padding`、`size` 等），适合抽离为可复用组件。

下面我将从 **结构、逻辑、样式、可维护性** 四个维度进行分析，并给出优化后的完整代码。

---

### ✅ 优化目标

- ✂️ **提取公共 icon 按钮组件**（`IconButton.vue`）
- 🎨 **合并重复样式**，使用 CSS 类复用
- 🧩 **简化模板结构**，提升可读性
- 📦 **保持功能不变**（折叠、刷新、搜索、主题切换等）

---

#### 第一步：创建可复用的 `IconButton` 组件

📁 **`src/components/IconButton.vue`**

> ✅ 这个组件接收 `iconName`（图标组件名称）、`size`、`disabled`，并统一处理 hover、点击等行为。

##### ✅ 配套 `IconButton` 组件代码

```vue
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
    <component :is="iconName" />
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
```

---

#### 第二步：优化 `LayHeader.vue`

##### ✅ 优化点说明

- 引入 `IconButton`
- 移除重复的 `.el-icon` 样式，统一用 `icon-button` 类
- 抽离图标组件（如 `Fold`, `Expand` 等）为变量或直接传入
- 简化模板结构

📄 **优化后的 `LayHeader.vue`**

##### ✅ 配套 JS

```vue
<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import SearchBox from '../SearchBox.vue'
import IconButton from '@/components/IconButton.vue'

const emit = defineEmits(['refresh'])
const isDark = ref(false)
const avatarUrl = ref('https://gcore.jsdelivr.net/gh/Ankerfy/blog_pics/images/202509231451856.jpg')

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)

const toggleSidebar = () => appStore.toggleSidebar()
const onRefreshClick = () => emit('refresh') // 刷新点击

// 搜索点击
const onSearchClick = () => {
  console.log('搜索被点击了')
  // 显示弹窗
}
</script>
```

---

##### ✅ 配套 模板html结构

```vue
<template>
  <div class="menu-nav">
    <div class="nav-left">
      <div class="toolkits-left-icon">
        <!-- 优化：二次封装 -->
        <IconButton :icon-name="isSidebarCollapse ? 'Expand' : 'Fold'" @click="toggleSidebar()" />
        <IconButton icon-name="RefreshRight" @click="onRefreshClick()" />

        <!-- 官方写法 -->
        <!-- <el-icon @click="toggleSidebar()" :size="16">
          <Fold v-if="!isSidebarCollapse" />
          <Expand v-else />
        </el-icon>
        <el-icon @click="onRefreshClick()" :size="16">
          <RefreshRight />
        </el-icon> -->
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
          <!-- 优化：二次封装 -->
          <IconButton icon-name="House" />
          <IconButton icon-name="Headset" />
          <IconButton :icon-name="isDark ? 'Sunny' : 'Moon'" @click="isDark = !isDark" />
          <IconButton icon-name="FullScreen" />
          <IconButton icon-name="Bell" />
          <IconButton icon-name="Setting" />

          <!-- 官方写法 -->
          <!-- <el-icon :size="16">
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
          </el-icon> -->
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

##### ✅ 配套 CSS 样式

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

/* .toolkits-left-icon > .el-icon {
  cursor: pointer;
  padding: 5px;
}
.toolkits-left-icon > .el-icon:hover,
.tools-l > .el-icon:hover {
  color: var(--color-text-icon);
  transition: all 0.3s ease;
  background-color: var(--vt-c-white-bg);
} */

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

/* .tools-l > .el-icon {
  cursor: pointer;
  padding: 5px;
} */

.tools-r {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
  padding: 0 10px;
  /* background-color: chocolate; */
}
```

---

### ✅ 优化成果总结

| 优化项           | 说明                                                   |
| ---------------- | ------------------------------------------------------ |
| **组件复用**     | `IconButton.vue` 统一封装图标按钮，避免重复代码        |
| **样式去重**     | 原先两处 `.el-icon:hover` 样式合并到 `IconButton` 内部 |
| **逻辑清晰**     | 模板更简洁，图标通过 `:icon` 动态传入                  |
| **扩展性强**     | 未来新增图标按钮只需 `<IconButton :icon="Xxx" />`      |
| **主题切换保留** | `isDark` 逻辑未改动，仍可控制 `Sunny`/`Moon` 切换      |

---

### 🔜 后续建议

- 如果面包屑也是动态的，可考虑封装 `AppBreadcrumb.vue`
- `SearchBox` 如果只在头部使用，也可考虑移到 `layout/components/` 下（如果采用 layout 子组件结构）
- 头像区域未来可封装为 `UserAvatar.vue`（带下拉菜单等）
