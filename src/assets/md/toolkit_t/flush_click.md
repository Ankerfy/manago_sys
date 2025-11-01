### 📄 Vue 3 + Element Plus 项目中实现“点击刷新图标，重载路由视图 + 显示顶部进度条”

**—— 实现步骤思路文档**

---

#### 🎯 一、需求目标

在采用 `el-aside + el-header + el-main` 布局的 Vue 3 项目中：

1. 点击 **header 区域的刷新图标**（非按钮，为图标元素）
2. **重新加载 main 区域的 `<router-view>` 路由出口内容**
3. 同时触发 **顶部加载进度条**（类似路由切换时的 NProgress 效果）
4. 使用 **定时器模拟数据加载过程**
5. 使用 **组合式 API（`<script setup>`）**，不使用选项式 API

---

#### ✅ 二、实现步骤

##### 1. 安装并配置 NProgress（<sapn style="color: red">已安装配置</sapn>）

##### 2. 创建 `Header.vue` 组件（含刷新图标）

```vue
<!-- src/components/Header.vue -->
<template>
  <div class="header-toolbar">
    <el-icon class="refresh-icon" @click="handleClick">
      <Refresh />
    </el-icon>
  </div>
</template>

<script setup>
import { Refresh } from '@element-plus/icons-vue'

// 定义事件
const emit = defineEmits(['refresh'])

const handleClick = () => {
  emit('refresh')
}
</script>
```

---

##### 3. 创建 `LayoutView.vue` 布局组件（核心）

```vue
<!-- src/LayoutView.vue -->
<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <slot name="aside">
        <Aside />
      </slot>
    </el-aside>

    <el-container>
      <el-header>
        <Header @refresh="handleRefresh" />
      </el-header>

      <!-- 主内容区 -->
      <el-main class="lay-main-content">
        <div id="app">
          <!-- 骨架屏：加载中 -->
          <el-skeleton v-if="loading" animated :rows="10" style="padding: 20px" />
          <!-- 路由视图：通过 key 控制重渲染 -->
          <RouterView v-else :key="routeKey" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProgress } from '@/composables/useProgress'
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'

// 路由切换时，刷新页面
const routeKey = ref(useRoute.fullPath)
const { start, finish } = useProgress()
const handleRefresh = () => {
  loading.value = true
  start()
  // 模拟数据加载时间
  setTimeout(() => {
    routeKey.value = useRoute.fullPath + '?t=' + Date.now()
    loading.value = false
    finish()
  }, 1200)
}
</script>
```

---

##### 4. 在 `App.vue` 中使用 `LayoutView.vue`

```vue
<!-- src/App.vue -->
<template>
  <LayoutView />
</template>

<script setup>
import LayoutView from './LayoutView.vue'
</script>
```

---

##### 5. 确保路由配置正确

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/home', component: () => import('@/views/Home.vue') },
  { path: '/dashboard', component: () => import('@/views/Dashboard.vue') },
  { path: '/', redirect: '/home' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

---

#### 🧠 三、核心原理说明

| 功能           | 实现方式                         | 原理                         |
| -------------- | -------------------------------- | ---------------------------- |
| 点击刷新图标   | `@click="$emit('refresh')"`      | 事件通信                     |
| 刷新 main 内容 | `<RouterView :key="routeKey" />` | `key` 变化 → 组件销毁重建    |
| 显示进度条     | `NProgress.start()` / `done()`   | 手动触发，与路由切换风格一致 |
| 骨架屏提示     | `v-if="loading"` + `el-skeleton` | 提升用户体验                 |
| 模拟数据加载   | `setTimeout`                     | 替换为真实 `axios` 请求即可  |

#### 📌 四、注意事项

1. **`routeKey` 必须初始化**：使用 `useRoute().fullPath` 作为初始值
2. **避免重复定义 `routeKey`**：确保只在 `LayoutView.vue` 中定义一次
3. **NProgress 不要遗漏 CSS**：`import 'nprogress/nprogress.css'`
4. **`useRoute()` 需在路由初始化后使用**：确保 `router` 已注入
5. **刷新频率控制**：可加防抖避免频繁点击

```js
import { debounce } from 'lodash-es'
const handleRefresh = debounce(() => { ... }, 300)
```

#### ✅ 五、最终效果

| 用户操作              | 系统响应                             |
| --------------------- | ------------------------------------ |
| 点击 header 刷新图标  | 触发 `refresh` 事件                  |
| 显示 NProgress 进度条 | 顶部蓝色加载条出现                   |
| 显示骨架屏            | `loading = true`，内容区变灰         |
| `setTimeout` 结束     | `routeKey` 更新，`<RouterView>` 重建 |
| 骨架屏消失            | `loading = false`                    |
| 进度条消失            | `NProgress.done()`                   |

> 💡 效果与路由切换几乎一致，但无需跳转，体验流畅。

#### 📎 六、可选优化（进阶）

| 优化项                     | 说明                                     |
| -------------------------- | ---------------------------------------- |
| 自定义 `useRefresh()` Hook | 抽离刷新逻辑，复用                       |
| 页面组件暴露 `onRefresh`   | 在 `defineExpose` 中提供刷新钩子         |
| 与 Pinia 结合              | 若需记录“上次刷新时间”等状态，可结合使用 |

#### ✅ 七、总结

| 目标                  | 是否达成 | 说明                           |
| --------------------- | -------- | ------------------------------ |
| 点击刷新图标          | ✅       | 通过 `@click` + `emit` 实现    |
| 刷新 main 内容        | ✅       | 通过 `:key="routeKey"` 重渲染  |
| 显示顶部进度条        | ✅       | `NProgress.start()` / `done()` |
| 使用定时器模拟        | ✅       | `setTimeout` 替代真实请求      |
| 使用 `<script setup>` | ✅       | 全程组合式 API                 |
