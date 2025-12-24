<!-- @/components/cards/UserCountCard.vue -->
<script lang="ts" setup>
import BaseCard from '@/components/cards/BaseCard.vue'

interface CardData {
  title: string
  tooltip?: string
  value: number
  change: number
  compareText: string
  showArrow: boolean
}

const mock_data = [
  {
    title: 'Daily active users',
    tooltip: 'Number of users who logged into the product in one day',
    value: 98500,
    change: 24,
    compareText: 'than yesterday',
    showArrow: false,
  },
  {
    title: 'Monthly Active Users',
    tooltip: 'Number of users who logged into the product in one month',
    value: 693700,
    change: -12,
    compareText: 'month on month',
    showArrow: false,
  },
  {
    title: 'New transactions today',
    value: 72000,
    change: 16,
    compareText: 'than yesterday',
    showArrow: true,
  },
  {
    title: 'This Week',
    value: 63862,
    change: 14,
    compareText: 'than last week',
    showArrow: true,
  },
]
</script>

<template>
  <div class="mb-2">
    <el-row :gutter="16">
      <el-col class="mt-2 mb-2" :xs="24" :sm="12" :md="6" v-for="(content, index) in mock_data" :key="index">
        <BaseCard v-bind="content" />
      </el-col>
    </el-row>
  </div>
</template>