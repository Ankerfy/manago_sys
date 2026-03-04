// \mock\user.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      const { username } = body
      if (username === 'admin') {
        return {
          code: 200,
          message: 'success', // 登录成功
          data: {
            token: Mock.mock('@string(32)'),
            username,
            roles: ['admin'],
          },
        }
      }
      return {
        code: 400,
        message: '用户名或密码错误',
      }
    },
  },
] as MockMethod[]
