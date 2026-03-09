// \mock\utils
/**
 * Mock 响应格式化（适配 Axios 拦截器）
 * @param data 响应数据（泛型保留类型）
 * @param code 状态码（默认200，与拦截器匹配）
 * @param message 提示信息（默认success，与拦截器的message字段匹配）
 * @returns 适配拦截器的响应体
 */
export function mockResponse<T = any>(data: T = null as T, code = 200, message = 'success') {
  // 兼容跨环境 uuid生成
  const generateRequestId = (): string => {
    // 浏览器环境 / node环境无crypto模块降级处理
    if (typeof window !== 'undefined' || !crypto?.randomUUID) {
      return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    }
    // node环境使用原生uuid
    return crypto.randomUUID()
  }

  return {
    code,
    message,
    data,
    timestamp: Date.now(), // 时间戳
    requestId: generateRequestId(), // 随机生成一个请求id
  }
}
