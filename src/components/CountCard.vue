<script setup>
import StatCard from '@/components/StatCard.vue'

const cards = [
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
  <div class="card-box">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :md="6" v-for="(card, index) in cards" :key="index" class="mb-4">
        <StatCard v-bind="card" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.card-box {
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 40px;
}
</style>