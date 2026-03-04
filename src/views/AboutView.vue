<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
</script>

<template>
  <!-- 页面容器 -->
  <div class="min-h-[calc(100vh-10rem)] p-6 bg-slate-50">
    <div class="max-w-5xl mx-auto space-y-8">

      <!-- 页面标题 -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <h1 class="text-[22px] font-bold text-slate-800">关于系统</h1>
        <p class="text-sm text-slate-500 mt-1">System Information</p>
      </div>

      <!-- 项目信息卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <el-card class="border border-slate-200 shadow-sm rounded-lg overflow-hidden">
          <template #header>
            <div class="text-base font-semibold text-slate-700">项目信息</div>
          </template>
          <div class="space-y-4 text-sm">
            <div class="flex">
              <span class="w-24 text-slate-500">项目名称：</span>
              <span class="text-slate-800 font-medium">个人后台管理系统脚手架</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">前端框架：</span>
              <span class="text-slate-800">Vue 3 + Vite + TypeScript</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">UI 框架：</span>
              <span class="text-slate-800">Element Plus</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">样式方案：</span>
              <span class="text-slate-800">Tailwind CSS</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">状态管理：</span>
              <span class="text-slate-800">Pinia</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">路由模式：</span>
              <span class="text-slate-800">动态路由 + 权限控制</span>
            </div>
          </div>
        </el-card>

        <!-- 版本信息 -->
        <el-card class="border border-slate-200 shadow-sm rounded-lg overflow-hidden">
          <template #header>
            <div class="text-base font-semibold text-slate-700">版本信息</div>
          </template>
          <div class="space-y-4 text-sm">
            <div class="flex">
              <span class="w-24 text-slate-500">当前版本：</span>
              <span class="text-slate-800 font-medium">v1.0.0</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">开发环境：</span>
              <span class="text-slate-800">Development</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">更新时间：</span>
              <span class="text-slate-800">2026-03-04</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">开发者：</span>
              <span class="text-slate-800">个人全栈项目</span>
            </div>
            <div class="flex">
              <span class="w-24 text-slate-500">架构说明：</span>
              <span class="text-slate-800">企业级标准架构</span>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 功能说明 -->
      <el-card class="border border-slate-200 shadow-sm rounded-lg overflow-hidden">
        <template #header>
          <div class="text-base font-semibold text-slate-700">系统功能</div>
        </template>
        <div class="p-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>动态路由加载</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>角色权限控制</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>按钮权限指令</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>路由守卫拦截</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>Mock 模拟接口</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>Pinia 状态管理</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>Tailwind 样式</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>Element Plus 组件</span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon class="text-blue-500">
                <Check />
              </el-icon>
              <span>布局系统完整</span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 底部说明 -->
      <div class="bg-white rounded-lg shadow-sm p-6 text-center text-sm text-slate-500 border border-slate-200">
        © 2026 All Rights Reserved · 个人学习项目 · 企业级前端架构
      </div>
    </div>
  </div>
</template>