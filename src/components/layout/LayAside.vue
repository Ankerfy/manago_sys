<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

// 获取折叠状态
const appStore = useAppStore()
const { isSidebarCollapse } = storeToRefs(appStore)

// Logo 图片地址
const logoUrl = ref('')
const picFit = 'contain'
</script>

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
    </div>
  </div>
</template>

<style scoped>
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
</style>