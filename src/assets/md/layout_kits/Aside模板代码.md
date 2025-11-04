#### ✅ [优化] `Aside` 侧边栏菜单代码（Vue 3 + `<script setup>` + Element Plus）

##### ✅ 配套 JS

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import MenuItem from '@/components/MenuItem.vue'

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)

// Logo 图片地址
const logoUrl = ref('')
const picFit = 'contain'

const menuItems = ref([])
// 加载菜单配置
async function loadMenuConfig() {
  try {
    const module = await import('@/config/menu.json')
    const data = JSON.parse(JSON.stringify(module.menuItems))
    menuItems.value = data

    // console.log('menu.json:', module)
    // console.log('data:', data)
  } catch (error) {
    console.error('Failed to load menu config:', error)
  }
}

onMounted(() => {
  loadMenuConfig()
})
</script>
```

---

##### ✅ 模板html结构

```vue
<template>
  <div class="sidebar">
    <!-- 侧边栏头部 -->
    <div class="sidebar-header" :class="{ 'is-collapse': isSidebarCollapse }">
      <div class="sidebar-logo">
        <el-image class="sidebar-logo-img" :src="logoUrl" :fit="picFit" alt="Logo" />
      </div>
      <span v-show="!isSidebarCollapse" class="sidebar-title">ManaGo_SYS</span>
    </div>

    <!-- 菜单区域 -->
    <div class="sidebar-menu">
      <el-menu
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        class="el-menu-vertical-demo"
        :collapse="isSidebarCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        router
      >
      <MenuItem v-for="(item, index) in menuItems" :key="index" :item="item" />
    </div>
  </div>
</template>
```

---

**优化：封装为`MenuItem`组件，菜单配置抽离为`src/config/menu.json`文件**

##### MenuItem.vue 组件代码

```vue
<script setup>
import {
  House,
  DataLine,
  Monitor,
  OfficeBuilding,
  Film,
  ChatLineSquare,
  Headset,
  Location,
  InfoFilled,
} from '@element-plus/icons-vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// 图标映射表
const iconMap = {
  House,
  DataLine,
  Monitor,
  OfficeBuilding,
  Film,
  ChatLineSquare,
  Headset,
  Location,
  InfoFilled,
}

const getIconComponent = (iconName) => {
  return iconMap[iconName] || null
}
</script>

<template>
  <!-- 单个菜单项 -->
  <el-menu-item v-if="!item.submenu" :index="item.index">
    <el-icon v-if="item.icon && iconMap[item.icon]">
      <component :is="getIconComponent(item.icon)" />
    </el-icon>
    <template #title>{{ item.title }}</template>
  </el-menu-item>

  <!-- 子菜单 -->
  <el-sub-menu v-else :index="item.index">
    <template #title>
      <el-icon v-if="item.icon && iconMap[item.icon]">
        <component :is="getIconComponent(item.icon)" />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <menu-item v-for="(child, idx) in item.submenu" :key="idx" :item="child" />
  </el-sub-menu>
</template>
```

**原菜单配置**

```vue
<!-- 首页 -->
        <el-menu-item index="/home">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <!-- 仪表盘 -->
        <el-sub-menu index="dashboard">
          <template #title>
            <el-icon><DataLine /></el-icon>
            <span>仪表盘</span>
          </template>
          <el-menu-item index="/dashboard/overview">
            <template #title>数据概览</template>
          </el-menu-item>
          <el-menu-item index="/dashboard/users">
            <template #title>用户活跃度</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 系统监控 -->
        <el-sub-menu index="monitor">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统监控</span>
          </template>
          <el-menu-item index="/monitor/data">
            <template #title>数据监控</template>
          </el-menu-item>
          <el-menu-item index="/monitor/view">
            <template #title>数据可视化</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 工作台 -->
        <el-sub-menu index="workspace">
          <template #title>
            <el-icon><OfficeBuilding /></el-icon>
            <span>工作台</span>
          </template>
          <el-menu-item index="/workspace/tasks">
            <template #title>任务中心</template>
          </el-menu-item>
          <el-menu-item index="/workspace/calendar">
            <template #title>日程安排</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 娱乐资讯 -->
        <el-sub-menu index="entertainment">
          <template #title>
            <el-icon><Film /></el-icon>
            <span>娱乐资讯</span>
          </template>
          <el-menu-item index="/entertainment/news">
            <template #title>最新资讯</template>
          </el-menu-item>
          <el-menu-item index="/entertainment/movies">
            <template #title>影视推荐</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 公告消息 -->
        <el-sub-menu index="messages">
          <template #title>
            <el-icon><ChatLineSquare /></el-icon>
            <span>公告消息</span>
          </template>
          <el-menu-item index="/messages/announcements">
            <template #title>公告栏</template>
          </el-menu-item>
          <el-menu-item index="/messages/inbox">
            <template #title>私信中心</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 媒体中心 -->
        <el-sub-menu index="media">
          <template #title>
            <el-icon><Headset /></el-icon>
            <span>媒体中心</span>
          </template>
          <el-menu-item index="/media/music">
            <template #title>在线音乐播放</template>
          </el-menu-item>
          <el-menu-item index="/media/video">
            <template #title>随机视频播放</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 地图天气 -->
        <el-sub-menu index="geo">
          <template #title>
            <el-icon><Location /></el-icon>
            <span>地图天气</span>
          </template>
          <el-menu-item index="/geo/map">
            <template #title>地图数据</template>
          </el-menu-item>
          <el-menu-item index="/geo/weather">
            <template #title>天气预报</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 关于 -->
        <el-menu-item index="/about">
          <el-icon><InfoFilled /></el-icon>
          <template #title>关于</template>
        </el-menu-item>
      </el-menu>
```

---

##### ✅ 配套 CSS 样式

```CSS
.sidebar {
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, left 0.3s ease;
}

.sidebar-header {
  display: flex;
  height: 48px;
  /* background-color: red; */
  align-items: center;
  gap: 12px;
  transition: padding 0.3s ease;
  padding: 0 16px;
}

.sidebar-header.is-collapse {
  height: 48px;
  align-items: center;
  padding: 0 16px;
}

.sidebar-logo {
  width: 32px;
  height: 32px;
}

.sidebar-logo-img {
  width: 100%;
  height: 100%;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  flex: 1;
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
}

.el-menu--collapse {
  transition: width 0.3s ease, left 0.3s ease;
}
```

---

#### ✅ 关键修改说明

| 特性                              | 说明                                                                      |
| --------------------------------- | ------------------------------------------------------------------------- |
| 🌟 `router` 属性                  | 添加 `router` 后，`index` 值即为路由路径，点击自动跳转                    |
| 🌟 `default-active="$route.path"` | 高亮当前路由对应的菜单项                                                  |
| 🌟 图标导入                       | 使用 `@element-plus/icons-vue` 中的真实图标组件（如 `House`, `DataLine`） |
| 🌟 菜单结构                       | 完全按照你规划的一、二级菜单组织，结构清晰                                |
| 🌟 `unique-opened`                | 保持一次只展开一个子菜单，提升体验                                        |
| 🌟 路由路径                       | 与之前设计的 `/dashboard/overview` 等完全一致，可直接对接 Vue Router      |
| 🌟 菜单配置抽离                   | 将菜单配置抽离成单独的 `menu.json` 文件                                   |
| 🌟 菜单封装为`MenuItem`组件       | 读取`menu.json`文件，遍历并生成菜单项                                     |

---

✅ **效果**：

- 点击菜单项自动跳转到对应页面
- 当前页面菜单高亮
- 支持折叠/展开
- 图标 + 文字清晰展示

可以直接将此代码替换原有 `aside` 组件内容，即可实现 **完整、可路由、可扩展的侧边栏菜单系统**。
