// @/utils/message.ts
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

/**
 * 简易消息提示封装
 * @param type success | warning | info | error
 * @param message 提示信息
 */
export const showMessage = (type: 'success' | 'warning' | 'info' | 'error', message: string) => {
  ElMessage({
    type,
    message,
    duration: 2000,
    offset: 60,
    showClose: false,
  })
}

// 快捷方法
export const Message = {
  success: (message: string) => showMessage('success', message),
  warning: (message: string) => showMessage('warning', message),
  info: (message: string) => showMessage('info', message),
  error: (message: string) => showMessage('error', message),
}
