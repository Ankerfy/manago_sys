// \mock\monitor.ts
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/monitor/site-status', // 不带 :domain
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      // 使用 query 获取
      console.log('Mock hit:', query.domain)
      const domain = query.domain as string
      if (!domain) {
        return { code: 400, message: 'Missing domain' }
      }
      const isUp = Math.random() > 0.3
      return {
        code: 200,
        message: 'success',
        data: {
          status: isUp ? 'up' : 'down',
          description: isUp ? '服务运行正常' : '当前无法访问',
        },
      }
    },
  },
] satisfies MockMethod[]
