// \mock\modules\menu.ts
import { MockMethod } from 'vite-plugin-mock'
import routeList from './menu.json'
import { mockResponse } from '../utils'

export default [
  {
    url: '/api/getRoutes',
    method: 'get',
    timeout: 120,
    response: () => {
      // 实际根据不同角色过滤路由列表
      // 校验路由数据是否存在
      if (!routeList || !Array.isArray(routeList)) {
        return mockResponse(null, 500, '路由菜单数据加载失败')
      }
      return mockResponse(routeList)
    },
  },
] satisfies MockMethod[]
