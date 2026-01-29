// @/api/modules/monitor.ts
import request from '@/api/request'

export interface SiteStatusParams {
  domain: string
}

export interface SiteStatusResult {
  status: 'up' | 'down' | 'unknown'
  description: string
}

export const getSiteStatus = (params: SiteStatusParams) => {
  return request.get<SiteStatusResult>('/monitor/site-status', { params })
}

export default {
  getSiteStatus,
}
