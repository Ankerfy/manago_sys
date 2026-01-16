// @/api/hotSearch.ts
import request from './request'
import type { ApiResponse } from '@/types/api'

export const fetchHotSearch = async (): Promise<string[]> => {
  try {
    // 跳过自动解包
    const res = await request.get<ApiResponse<string[]>>('/hot-search', {
      custom: { skipDataWrap: true },
    })

    if (res.data && res.data.data) {
      return res.data.data
    } else {
      throw new Error('返回数据为空')
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || err.message || '获取热搜失败'
    throw new Error(msg)
  }
}
