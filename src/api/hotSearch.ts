// @/api/hotSearch.ts
import request from './request'

export interface HotSearchParams {
  page?: number
  size?: number
}

export const getHotSearch = (params?: HotSearchParams) => {
  return request.get<string[]>('/hot-search', {
    params,
    custom: { skipDataWrap: true },
  })
}

export default {
  getHotSearch,
}
