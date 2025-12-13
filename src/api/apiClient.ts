// @/api/apiClient.ts
import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// 扩展 AxiosRequestConfig
declare module 'axios' {
  interface AxiosRequestConfig {
    custom?: {
      skipDataWrap?: boolean
    }
  }
}

// 创建 axios 示例
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 支持环境变量
  timeout: 5000,
})

// 请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加自定义请求头
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'

    // 添加认证 token 示例
    // const token = localStorage.getItem('token')
    // if (token && config.headers) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // 若请求配置了skipDataWrap，则直接返回数据
    if (response.config.custom?.skipDataWrap) {
      return response
    }
    return response.data // 默认返回 data
  },
  (error) => {
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response
      console.log(`[API ERROR] HTTP ${status}`, data)
    } else if (error.request) {
      // 请求被取消或没有响应
      console.log('[Network Error] No response received:', error.request)
    } else {
      // 其他错误
      console.log('[Request Setup Error]:', error.message)
    }
    return Promise.reject(error)
  },
)

export default api
