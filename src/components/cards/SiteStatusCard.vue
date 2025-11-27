<!-- @/components/cards/SimpleSiteStatusCard.vue -->
<script setup>
import api from '@/api'

const props = defineProps({
  domain: { type: String, required: true },
  protocol: { type: String, default: 'http' },
})

// 状态：'up' | 'down' | 'unknown'
const status = ref('unknown')
const description = ref('正在检测...')

const statusText = computed(() => {
  if (status.value === 'up') return '正常'
  if (status.value === 'down') return '异常'
  return '未知'
})

const dotClass = computed(() => {
  return {
    up: status.value === 'up',
    down: status.value === 'down',
    unknown: status.value === 'unknown',
  }
})

const openSite = () => {
  window.open(`${props.protocol}://${props.domain}`, '_blank', 'noopener,noreferrer')
}

const fetchStatus = async () => {
  try {
    const res = await api.get(`/api/status/${props.domain}`)
    status.value = res.data.status === 'up' ? 'up' : 'down'
    description.value =
      res.data.description || (status.value === 'up' ? '服务运行正常' : '当前无法访问')
  } catch (err) {
    status.value = 'down'
    description.value = '状态检测失败'
  }
}

let intervalId = null
onMounted(() => {
  fetchStatus()
  intervalId = setInterval(fetchStatus, 5 * 60 * 1000)
})
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="simple-site-card">
    <!-- 顶部：域名 + 跳转按钮 -->
    <div class="header">
      <span class="domain">{{ domain }}</span>
      <button @click="openSite" class="jump-btn" title="打开站点">↗</button>
    </div>

    <!-- 状态指示器 -->
    <div class="status-indicator">
      <div class="status-dot" :class="dotClass"></div>
      <span class="status-label">{{ statusText }}</span>
    </div>

    <!-- 底部描述 -->
    <div class="status-desc">{{ description }}</div>
  </div>
</template>

<style scoped>
.simple-site-card {
  background: #fff;
  border-radius: 12px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  min-width: 280px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.domain {
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  word-break: break-all;
}

.jump-btn {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}
.jump-btn:hover {
  background: #e5e7eb;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  transition: background-color 0.3s ease; /* 背景色平滑过渡 */
  animation: pulse 2s infinite; /* 持续动画 */
}

/* 三种状态的颜色 */
.status-dot.up {
  background-color: #10b981; /* green-500 */
}
.status-dot.down {
  background-color: #ef4444; /* red-500 */
}
.status-dot.unknown {
  background-color: #9ca3af; /* gray-500 */
}

/* 统一脉冲动画（通过 box-shadow 的 alpha 实现淡入淡出感） */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--pulse-color);
  }
  70% {
    box-shadow: 0 0 0 8px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

/* 通过 CSS 变量动态设置光晕颜色 */
.status-dot.up {
  --pulse-color: rgba(16, 185, 129, 0.4);
}
.status-dot.down {
  --pulse-color: rgba(239, 68, 68, 0.4);
}
.status-dot.unknown {
  --pulse-color: rgba(156, 163, 175, 0.3);
}

.status-label {
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
}

.status-desc {
  font-size: 12px;
  color: #6b7280;
  text-align: right;
}
</style>