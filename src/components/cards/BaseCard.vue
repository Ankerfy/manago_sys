<!-- @/components/cards/BaseCard.vue -->
<script setup>
defineProps({
  title: String,
  tooltip: String,
  value: Number,
  change: Number,
  compareText: String, // 正 增长；负 下降
  showArrow: Boolean,
})
</script>

<template>
  <div class="stat-card">
    <el-statistic :value="value" :title="title">
      <template #title>
        <div class="stat-title">
          {{ title }}
          <el-tooltip v-if="tooltip" effect="dark" :content="tooltip" placement="top">
            <el-icon :size="12" style="margin-left: 4px">
              <Warning />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-statistic>

    <div class="stat-footer">
      <div class="footer-item">
        <span>{{ compareText }}</span>
        <span :class="change >= 0 ? 'green' : 'red'">
          {{ Math.abs(change) }}%
          <el-icon>
            <CaretTop v-if="change >= 0" />
            <CaretBottom v-else />
          </el-icon>
        </span>
      </div>

      <div v-if="showArrow" class="footer-item arrow">
        <el-icon :size="14">
          <ArrowRight />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  height: 100%;
  padding: 16px;
  background-color: var(--el-bg-color-overlay);
  border-radius: 12px;
  box-shadow: var(--color-shadow-card);
  transition: var(--transition-box-shadow);
}

.stat-card:hover {
  box-shadow: var(--color-shadow-card-hover);
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.stat-title {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.stat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: var(--el-text-color-regular);
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>