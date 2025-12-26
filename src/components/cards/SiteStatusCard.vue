<!-- @/components/cards/SiteStatusCard.vue -->
<script lang="ts" setup>
import api from '@/api/apiClient.ts'

const props = defineProps<{
  domain: string
  protocol?: string
}>()
const protocol = props.protocol || 'http'

// 状态：'up' | 'down' | 'unknown'
type Status = 'up' | 'down' | 'unknown'
const status = ref<Status>('unknown')
const description = ref('正在检测...')

const statusText = computed(() => {
  switch (status.value) {
    case 'up': return '正常'
    case 'down': return '异常'
    default: return '未知'
  }
})

const dotClass = computed(() => ({
  'bg-green-500': status.value === 'up',
  'bg-red-500': status.value === 'down',
  'bg-gray-400': status.value === 'unknown',
}))

const openSite = () => {
  window.open(`${protocol}://${props.domain}`, '_blank', 'noopener,noreferrer')
}

const fetchStatus = async () => {
  try {
    const res = await api.get(`/status`, {
      params: { domain: props.domain }  // 通过查询参数传递
    })
    const data = res.data
    status.value = data.status === 'up' ? 'up' : 'down'
    description.value = data.description || (status.value === 'up' ? '服务运行正常' : '当前无法访问')
  } catch (err) {
    status.value = 'down'
    description.value = '状态检测失败'
  }
}

let intervalId: number | null = null
onMounted(() => {
  fetchStatus()
  intervalId = window.setInterval(fetchStatus, 5 * 60 * 1000) // 每5分钟检查一次
})
onBeforeUnmount(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
})
</script>

<template>
  <div
    class="min-w-75 bg-white rounded-xl shadow-sm transition-shadow hover:shadow-md p-4 font-mono md:font-serif antialiased">
    <!-- 顶部：域名 + 跳转按钮 -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-medium text-gray-900 break-all">{{ domain }}</span>
      <button @click="openSite"
        class="w-6.5 h-6.5 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-xs cursor-pointer transition-colors hover:bg-gray-200"
        title="打开站点">↗</button>
    </div>

    <!-- 状态指示器 -->
    <div class="flex items-center justify-end gap-2 mb-2">
      <span class="relative flex size-3">
        <span :class="dotClass" class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-65"></span>
        <span :class="dotClass" class="relative inline-flex size-3 rounded-full"></span>
      </span>
      <span class="text-xs font-medium text-gray-700">{{ statusText }}</span>
    </div>

    <!-- 底部描述 -->
    <div class="text-xs text-gray-700 text-right">{{ description }}</div>
  </div>
</template>