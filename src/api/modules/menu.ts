// @/api/modules/menu.ts
import request from '@/utils/request'
import type { ApiRouteRecord } from '@/types/api/router'

/**
 * 获取菜单路由列表
 * TODO：状态管理缓存菜单列表，浏览器刷新
 * @returns Promise<ApiRouteRecord[]> 纯净的业务数据（路由数组）
 */
export const getMenuList = async (): Promise<ApiRouteRecord[]> => {
  try {
    const res = await request.get<ApiRouteRecord[]>('/getRoutes')
    // console.log('menu_api_res', res)
    // 空值校验
    return res?.data ?? ([] as ApiRouteRecord[])
  } catch (error) {
    console.error('获取菜单那列表失败：', error instanceof Error ? error.message : error)
    return [] as ApiRouteRecord[]
  }
}

export default {
  getMenuList,
}
