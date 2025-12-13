<script lang="ts" setup>
import { fetchHotSearch } from '@/api/hotSearch'

// 热搜 mock 数据
const hotSearches = ref<string[]>([])

onMounted(async () => {
  hotSearches.value = await fetchHotSearch()
})
</script>

<template>
  <!-- 热搜走马灯 -->
  <div class="hot-search">
    <div class="hot-search-icon">
      <el-icon>
        <BellFilled />
      </el-icon>
    </div>
    <div class="hot-search-content">
      <el-carousel height="40px" direction="vertical" :autoplay="true" :motion-blur="true" :interval="3800">
        <el-carousel-item v-for="(text, index) in hotSearches" :key="index">
          <span>{{ text }} + {{ index }}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style coped>
.hot-search {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 0 10px;
  border-bottom: 1px solid #cdcdcd;
}

.hot-search-icon {
  padding: 5px;
  color: #f56c6c;
}

.hot-search-content {
  /* background-color: red; */
  width: 500px;
}

.el-carousel__item span {
  font-size: 14px;
  color: #475669;
  opacity: 0.75;
  text-align: center;
  line-height: 40px;
}
</style>