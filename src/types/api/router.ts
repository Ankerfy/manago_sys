// @types/api/router.ts
import type { RouteRecordRaw } from 'vue-router'

// 后端返回的路由结构
export interface ApiRouteRecord {
  id: number | string
  path: string
  name: string
  component: string // 组件路径字符串
  redirect?: string
  meta: {
    title: string
    icon?: string
    hidden?: boolean
    auth: boolean // 是否需要登录
    roles: string[]
  }
  children?: ApiRouteRecord[]
}

// 前端路由结构（映射实际组件），Omit剔除原有冲突属性，并合并新定义
export type AppRouteRecordRaw = Omit<RouteRecordRaw, 'meta' | 'children'> & {
  meta: {
    title: string
    icon?: string
    hidden?: boolean
    auth: boolean
    roles: string[]
  }
  children?: AppRouteRecordRaw[]
}
