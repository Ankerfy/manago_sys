<!-- @/components/cards/SiteStatusCard.vue -->
<script lang="ts" setup>
import request from '@/api'
import type { Ref } from 'vue'
import type { SiteStatusResult } from '@/types/api'

const props = defineProps<{ domain: string; protocol?: string }>()
const protocol = props.protocol || 'http'

const siteStatu = ref<SiteStatusResult | null>(null)

// 状态：'up' | 'down' | 'unknown'
const status = ref<SiteStatusResult['status']>('unknown')
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

// 预览站点
const openSite = () => {
  window.open(`${protocol}://${props.domain}`, '_blank', 'noopener,noreferrer')
}

// 获取站点状态
const fetchStatus = async () => {
  try {
    const res = await request.monitor.getSiteStatus({ domain: props.domain })
    siteStatu.value = res.data
    status.value = siteStatu.value.status
    description.value = siteStatu.value.description
  } catch (err) {
    status.value = 'down'
    description.value = '状态检测失败'
  }
}

// 注入刷新信号 - 父组件Data.vue
const refreshSignal = inject<Ref<number>>('refreshSignal', ref(0))

// 挂载时开始定时检查
onMounted(() => {
  fetchStatus()
})

// 刷新信号监听
watch(refreshSignal, (val) => {
  // console.log('子组件收到刷新信号：', val);
  fetchStatus()
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

    <!-- <div class="Debug"> Debug: {{ refreshSignal }}</div> -->
  </div>
</template>@/api/request