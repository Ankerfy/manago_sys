// @/store/route-store.ts
import { defineStore } from 'pinia'
import request from '@/utils/request'
import { transformRoute } from '@/utils/routeHelper'
import type { ApiRouteRecord, AppRouteRecordRaw } from '@/types/api'

export const useRouteStore = defineStore('routeStore', {
  state: () => ({
    dynamicRoutes: [] as AppRouteRecordRaw[],
    rawRoutes: [] as ApiRouteRecord[],
  }),
  getters: {
    menuRoutes: (state) => {
      return state.dynamicRoutes.filter((route) => !route.meta?.hidden)
    },
  },
  actions: {
    async fetchRoutes(): Promise<AppRouteRecordRaw[]> {
      try {
        const res = await request.get<ApiRouteRecord[]>('/route/getRoutes')
        this.rawRoutes = res.data || []
        // 转换为前端路由结构
        this.dynamicRoutes = this.rawRoutes.map((route) => transformRoute(route))
        return this.dynamicRoutes
      } catch (error) {
        console.error('获取路由表失败', error)
        // 异常清空，避免脏数据
        this.dynamicRoutes = []
        this.rawRoutes = []
        return []
      }
    },
    // 根据角色过滤路由
    filterRoutesByRoles(roles: string[]): void {
      const filterRoute = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
        return routes
          .filter((route) => {
            const { meta } = route
            // 无需权限的路由直接保留
            if (!meta?.auth) return true
            // 过滤需要权限的路由
            if (!roles.length || !meta.roles?.length) return false
            // 角色匹配
            return roles.some((role) => route.meta?.roles?.includes(role))
          })
          .map((route) => {
            // 递归过滤子路由，深拷贝避免修改原数据
            const newRoute = { ...route }
            if (newRoute.children) {
              newRoute.children = filterRoute(newRoute.children)
            }
            return newRoute
          })
      }
      this.dynamicRoutes = filterRoute(this.dynamicRoutes)
    },
    clearRoute(): void {
      this.dynamicRoutes = []
      this.rawRoutes = []
    },
    addRoute(newRoute: AppRouteRecordRaw): void {
      this.dynamicRoutes.push(newRoute)
    },
  },
  persist: {
    key: 'route-store',
    storage: sessionStorage,
    paths: ['dynamicRoutes'],
  },
})
