// @/types/api.d.ts
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  success?: boolean
}

// 扩展 AxiosResponse
declare module 'axios' {
  export interface AxiosResponse<T = any> {
    data: ApiResponse<T>
  }
}
