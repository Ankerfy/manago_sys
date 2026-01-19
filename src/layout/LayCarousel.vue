<script lang="ts" setup>
import { getHotSearch } from '@/api/hotSearch'

// 热搜 mock 数据
const hotSearches = ref<string[]>([])

// 获取热搜
const fetchHotSearch = async () => {
  const res = await getHotSearch()
  console.log(res);

  hotSearches.value = res.data
}

onMounted(() => {
  fetchHotSearch()
})
</script>

<template>
  <!-- 热搜走马灯 -->
  <div class="flex items-center justify-start gap-1.5 px-2.5 py-0 border-b border-[#cdcdcd]">
    <div class="p-1.5 text-[#f56c6c]">
      <el-icon>
        <BellFilled class="text-sm/4" />
      </el-icon>
    </div>
    <div class="hot-search-content w-75">
      <el-carousel height="40px" direction="vertical" :autoplay="true" :motion-blur="true" :interval="3800">
        <el-carousel-item v-for="(text, index) in hotSearches" :key="index" class="truncate">
          <span class="text-sm/10 text-[#475669] opacity-75 pl-1">{{ text }}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>