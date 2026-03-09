// \mock\modules\monitor.ts
import { MockMethod } from 'vite-plugin-mock'
import { mockResponse } from '../utils'

export default [
  {
    url: '/api/monitor/site-status', // 不带 :domain
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      // 使用 query 获取
      // console.log('Mock hit:', query.domain)
      const domain = query.domain as string
      // 校验 domain
      if (!domain || typeof domain !== 'string') {
        return mockResponse(null, 400, '参数错误：domain不能为空')
      }
      const isUp = Math.random() > 0.3
      return mockResponse({
        status: isUp ? 'up' : 'down',
        description: isUp ? '服务运行正常' : '当前无法访问',
        domain: domain.trim(),
        checkTime: new Date().toISOString(),
      })
    },
  },
] satisfies MockMethod[]
