// @/api/hotSearch.ts
import request from './request'
import type { HotSearchParams } from '@/types/api'

export const getHotSearch = (params?: HotSearchParams) => {
  return request.get<string[]>('/h/hot-search', {
    params,
    custom: { skipDataWrap: true },
  })
}

export default {
  getHotSearch,
}
