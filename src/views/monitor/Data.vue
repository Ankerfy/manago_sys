<script lang="ts" setup>
import SiteStatusCard from '@/components/cards/SiteStatusCard.vue'
import { showMessage, Message } from '@/utils/message'

interface Site {
  protocol: string
  domain: string
}

const sites: Site[] = [
  { protocol: 'https', domain: 'icy.ankerfy.dpdns.org' },
  { protocol: 'https', domain: 'mine.diudue.dpdns.org' },
  { protocol: 'https', domain: 'bj.diudue.dpdns.org' },
  { protocol: 'https', domain: 'ro.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tiny.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tin.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tiy.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tny.diudue.dpdns.org' },
]

// 定义 refs 来引用 DOM 元素
const uuidInput = ref<HTMLInputElement | null>(null)
const generateBtn = ref<HTMLButtonElement | null>(null)
const copyBtn = ref<HTMLButtonElement | null>(null)
const resetBtn = ref<HTMLButtonElement | null>(null)

// 刷新信号
const refreshSignal = ref(0)
provide('refreshSignal', refreshSignal)

// 定时器
let refreshTimer: number | null = null
const startAutoRefresh = () => {
  // console.log('启动自动刷新')
  refreshSignal.value++
  refreshTimer = window.setInterval(() => {
    // console.log('【父组件】触发刷新，当前值:', refreshSignal.value)
    refreshSignal.value++
  }, 5 * 60 * 1000)
}

const stopAutoRefresh = () => {
  if (refreshTimer !== null) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

// 手动刷新
const handleManualRefresh = () => {
  // console.log(refreshSignal.value);
  // 模拟手动刷新 - 网络延迟
  setTimeout(() => {
    showMessage('success', '刷新成功')
  }, 1000)
  refreshSignal.value++
}

// 在组件挂载后执行
onMounted(() => {
  // 启动定时器
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<template>
  <div class=" flex bg-[#fcfcfc] rounded-lg shadow-md p-5 font-mono md:font-serif antialiased">
    <div class="flex gap-3 items-center">
      <h4 class="ml-5 font-semibold">站点监测</h4>
      <!-- 刷新倒计时 5分钟一刷新 -->
      <button @click="handleManualRefresh" class="text-2xl text-blue-600 hover:text-blue-400 cursor-pointer p-2">
        🔄
      </button>
    </div>
    <div class="flex gap-4 flex-wrap justify-around">
      <!-- 站点状态 -->
      <SiteStatusCard v-for="item in sites" :key="item.domain" :domain="item.domain" :protocol="item.protocol" />
    </div>
  </div>
</template>