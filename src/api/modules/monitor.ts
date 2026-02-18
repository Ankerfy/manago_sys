// @/api/modules/monitor.ts
import request from '@/api/request'
import type { SiteStatusParams, SiteStatusResult } from '@/types/api'

export const getSiteStatus = (params: SiteStatusParams) => {
  return request.get<SiteStatusResult>('/monitor/site-status', { params })
}

export default {
  getSiteStatus,
}
