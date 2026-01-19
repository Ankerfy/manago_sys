// @/api/request.ts
import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { Message } from '@/utils/message'

// 扩展 AxiosRequestConfig
declare module 'axios' {
  interface AxiosRequestConfig {
    custom?: {
      skipDataWrap?: boolean
    }
  }
}

// 创建 axios 示例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 支持环境变量
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加自定义请求头
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'

    // 添加认证 token 示例
    // const token = localStorage.getItem('token')
    // if (token && config.headers) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }

    // 时间戳 防缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data

    // 若请求配置了skipDataWrap，则直接返回数据
    if (response.config.custom?.skipDataWrap) {
      return res
    }

    if (res.code && res.code === 200) {
      return res
    } else {
      // 错误处理
      Message.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message))
    }
  },
  (error) => {
    let message = '网络异常，请稍后再试'
    if (error.response) {
      // 服务器返回错误状态码
      const { status } = error.response
      switch (status) {
        case 401:
          message = '未授权，请重新登录'
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          message = '权限不足，拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = error.response.data?.message || `请求失败(${status})`
      }
    } else if (error.request) {
      message = '请求超时，请稍后再试'
    } else {
      message = error.message || '请求配置错误'
    }

    Message.error(message)
    return Promise.reject(error)
  },
)

export default service
