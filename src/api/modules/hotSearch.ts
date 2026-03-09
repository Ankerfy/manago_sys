// @/api/hotSearch.ts
import request from '@/utils/request'
import type { HotSearchParams } from '@/types/api'

/**
 * 获取热搜列表
 * @param params - 可选查询参数
 * @param skipDataWrap - 是否跳过数据包裹（默认false，适配接口特殊配置）
 * @returns Promise<string[]> 热搜列表数组（兜底返回空数组）
 */
export const getHotSearch = async (
  params?: HotSearchParams,
  skipDataWrap: boolean = true,
): Promise<string[]> => {
  try {
    const res = await request.get<string[]>('/h/hot-search', {
      params,
      custom: { skipDataWrap },
    })
    // console.log('hotSearch_api_res', res)
    return res?.data ?? ([] as string[])
  } catch (error) {
    console.error('获取热搜列表失败', error instanceof Error ? error.message : error)
    return [] as string[]
  }
}

export default {
  getHotSearch,
}
