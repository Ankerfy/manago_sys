<!-- @/components/cards/BaseCard.vue -->
<script lang="ts" setup>
interface Props {
  title?: string
  tooltip?: string
  value?: number
  change?: number
  compareText?: string
  showArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  tooltip: '',
  value: 0,
  change: 0,
  compareText: '',
  showArrow: false,
})
</script>

<template>
  <div class="h-full rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800">
    <el-statistic :value="value" :title="title">
      <template #title>
        <div class="inline-flex items-center font-medium">
          {{ title }}
          <el-tooltip v-if="tooltip" effect="dark" :content="tooltip" placement="top">
            <el-icon :size="12" class="ml-1">
              <Warning />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-statistic>

    <div class="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
      <div>
        <span>{{ compareText }}</span>
        <span :class="change >= 0 ? 'text-green-500' : 'text-red-500'">
          {{ Math.abs(change) }}%
          <el-icon>
            <CaretTop v-if="change >= 0" />
            <CaretBottom v-else />
          </el-icon>
        </span>
      </div>

      <div v-if="showArrow" class="flex items-center gap-4">
        <el-icon :size="14">
          <ArrowRight />
        </el-icon>
      </div>
    </div>
  </div>
</template>