// @/api/index.js
import axios from 'axios'

// 创建一个 axios 实例（可统一配置 baseURL、超时等）
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 支持环境变量
  timeout: 10000,
})

// 可选：添加请求/响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API 请求失败:', error)
    return Promise.reject(error)
  }
)

export default api