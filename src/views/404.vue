<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/home')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
    <div class="text-center max-w-lg w-full">
      <!-- 404 数字 -->
      <h1 class="text-[120px] font-bold text-blue-500 leading-none">404</h1>

      <!-- 文字 -->
      <h2 class="text-2xl md:text-3xl font-semibold text-slate-700 mt-4">
        页面不存在或已被移除
      </h2>
      <p class="text-slate-500 mt-3 text-sm">
        Sorry, the page you visited does not exist.
      </p>

      <!-- 按钮 -->
      <div class="mt-8">
        <el-button type="primary" @click="goHome" class="h-10 px-8">
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>