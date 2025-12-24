<!-- @/components/search/SearchBox.vue -->
<script lang="ts" setup>
// 定义点击事件
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="flex items-center justify-center 
  gap-2 italic
  bg-[#e6e6ff] 
  border border-[#d0c4ff] rounded-full 
  px-1.5 py-1 
  cursor-pointer 
  transition-all duration-300 ease-in-out  
  hover:bg-[#d8d8ff] hover:-translate-y-0.5
  " @click="handleClick">
    <el-icon :size="16" class="text-[#9981fa]">
      <Search />
    </el-icon>
    <span class="text-[#333] text-sm">搜索</span>
    <span class="ml-2 border border-[#d0c4ff] rounded-md 
    bg-[#f0f0ff] 
    px-1.5 py-0.5 
    text-xs text-[#666] font-bold
    ">Ctrl + K</span>
  </div>
</template>