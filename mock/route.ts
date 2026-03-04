// \mock\route.ts
import { MockMethod } from 'vite-plugin-mock'
import routeMap from '../mock/menu.json'

export default [
  {
    url: '/api/getRoutes',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: routeMap,
      }
    },
  },
] as MockMethod[]
