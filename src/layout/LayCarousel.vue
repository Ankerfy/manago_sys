<script setup>
import { ref } from 'vue'
</script>

<template>
  <!-- 热搜走马灯 -->
  <div class="hot-search">
    <div class="hot-search-icon">
      <!-- <el-icon><Bell /></el-icon> -->
      <el-icon><BellFilled /></el-icon>
    </div>
    <div class="hot-search-content">
      <el-carousel
        height="40px"
        direction="vertical"
        :autoplay="true"
        :motion-blur="true"
        :interval="3800"
      >
        <el-carousel-item v-for="item in 5" :key="item.index">
          <span>Hello_World + {{ item }}</span>
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
  gap: 10px;
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