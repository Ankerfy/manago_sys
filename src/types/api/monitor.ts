// @/types/api/monitor.ts
// 站点域名参数类型
export interface SiteStatusParams {
  domain: string
}

// 站点状态返回结果类型
export interface SiteStatusResult {
  status: 'up' | 'down' | 'unknown'
  description: string
}
