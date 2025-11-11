<script setup>
import { Search } from '@element-plus/icons-vue'

// 定义点击事件
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="search-box" @click="handleClick">
    <el-icon :size="16">
      <Search />
    </el-icon>
    <span class="search-p">搜索</span>
    <span class="search-h-k">Ctrl + K</span>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  gap: 8px;
  background-color: #e6e6ff;
  border: 1px solid #d0c4ff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.search-box:hover {
  background-color: #d8d8ff;
  transform: translateY(-1px);
}

.search-box > .el-icon {
  color: #9981fa;
}

.search-p {
  color: #333;
  font-size: 14px;
}

.search-h-k {
  background-color: #f0f0ff;
  border: 1px solid #d0c4ff;
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 12px;
  color: #666;
  margin-left: 8px;
}
</style>