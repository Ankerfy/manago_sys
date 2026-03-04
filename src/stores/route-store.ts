// @/store/route-store.ts
import { defineStore } from 'pinia'
import request from '@/api/request'
import { transformRoute } from '@/utils/routeHelper'
import type { ApiRouteRecord, AppRouteRecordRaw } from '@/types/api'

const useRouteStore = defineStore('routeStore', {
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
    async fetchRoutes() {
      try {
        const res = await request.get<ApiRouteRecord[]>('/route/getRoutes')
        this.rawRoutes = res.data
        // 转换为前端路由结构
        this.dynamicRoutes = this.rawRoutes.map((route) => transformRoute(route))
        return this.dynamicRoutes
      } catch (error) {
        console.error('获取路由表失败', error)
        return []
      }
    },
    // 根据角色过滤路由
    filterRoutesByRoles(roles: string[]) {
      const filter = (routes: AppRouteRecordRaw[]) => {
        return routes
          .filter((route) => {
            // 无需权限的路由直接保留
            if (!route.meta?.auth) return true
            // 校验角色是否匹配
            if (route.meta.roles?.length) {
              return roles.some((role) => route.meta?.roles?.includes(role))
            }
            return false
          })
          .map((route) => {
            // 递归过滤子路由
            if (route.children) {
              route.children = filter(route.children)
            }
            return route
          })
      }
      this.dynamicRoutes = filter(this.dynamicRoutes)
    },
    clearRoute() {
      this.dynamicRoutes = []
      this.rawRoutes = []
    },
  },
  persist: {
    key: 'route-store',
    storage: sessionStorage,
    paths: ['dynamicRoutes'],
  },
})
