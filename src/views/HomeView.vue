<script setup>
import UserCountCard from '@/components/cards/UserCountCard.vue'

const value = ref('')
</script>

<template>
  <!-- 统计数据 -->
  <div class="graid-container">
    <div class="flex count-graid">
      <UserCountCard />
    </div>

    <div class="flex justify-center dates-selector">
      <el-date-picker-panel v-model="value" />
    </div>
  </div>
  <!-- 日期选择器 -->
</template>

<style scoped>
.graid-container {
  display: flex;
  flex-direction: column;
}

.dates-selector {
  padding: 10px;
  background-color: var(--color-bg);
  border-radius: 12px;
  box-shadow: var(--color-shadow-card);
  transition: box-shadow var(--transition-speed) ease;
}

.dates-selector:hover {
  box-shadow: var(--color-shadow-card-hover);
}
</style>

