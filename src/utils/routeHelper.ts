// @/utils/routeHelper.ts
// 路由映射，将后端返回的component路径映射为实际组件
import type { ApiRouteRecord, AppRouteRecordRaw } from '@/types/api/router'
import About from '@/views/About.vue'

// 组件映射
const componentsMap = new Map<string, any>([
  ['about/index.vue', About],
  // 其他公共组件提前注册
])

// 路由映射
export function transformRoute(route: ApiRouteRecord): AppRouteRecordRaw {
  const { path, name, component, redirect, meta, children } = route
  // 懒加载
  const comp = componentsMap.get(component) || (() => import(`@/views/${component}`))

  const appRoute: AppRouteRecordRaw = {
    path,
    name,
    component: comp,
    redirect,
    meta,
  }
  // 递归处理子路由
  if (children && children.length > 0) {
    appRoute.children = children?.map((child) => transformRoute(child))
  }
  return appRoute
}
