<script lang="ts" setup>
import UserCountCard from '@/components/cards/UserCountCard.vue'

const value = ref<string>('')
</script>

<template>
  <!-- 统计数据 -->
  <div class="flex flex-col">
    <UserCountCard />
    <!-- 日期选择器 -->
    <div class="rounded-xl bg-white p-2 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800">
      <el-date-picker-panel v-model="value" />
    </div>

  </div>
</template>