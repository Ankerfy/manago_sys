// @/api/modules/monitor.ts
import request from '@/utils/request'
import type { SiteStatusParams, SiteStatusResult } from '@/types/api'

/**
 * 查询站点状态
 * @param params - 查询参数（包含domain等字段）
 * @returns Promise<SiteStatusResult> 站点状态数据（兜底返回默认值）
 */
export const getSiteStatus = async (params: SiteStatusParams): Promise<SiteStatusResult> => {
  try {
    const res = await request.get<SiteStatusResult>('/monitor/site-status', { params })
    // console.log('monitor_api_res', res)
    return (
      res?.data ??
      ({
        status: 'unknown',
        description: '未知状态',
      } as SiteStatusResult)
    )
  } catch (error) {
    console.error('获取站点状态失败：', error instanceof Error ? error.message : error)
    return {
      status: 'down',
      description: '状态检测失败',
    } as SiteStatusResult
  }
}

export default {
  getSiteStatus,
}
