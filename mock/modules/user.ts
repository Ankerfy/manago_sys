// \mock\modules\user.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { mockResponse } from '../utils'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      const { username, password } = body || {}
      // 空值校验
      if (!username || !password) {
        return mockResponse(null, 400, '参数错误：用户名或密码不能为空')
      }
      // 模拟登录逻辑, 不同角色用户场景
      const mockUserMap = {
        admin: {
          token: Mock.mock('@string(32, 32)'),
          username: 'admin',
          roles: ['admin'],
          permissions: ['*'], // 所有权限
        },
        test: {
          token: Mock.mock('@string(32, 32)'),
          username: 'test',
          roles: ['user'],
          permissions: ['user:*'],
        },
      }

      // 校验用户名、密码（模拟密码统一：123456）
      const vaildUser = mockUserMap[username]
      if (vaildUser && password === '123456') {
        return mockResponse(vaildUser, 200, '登录成功')
      }
      // 登录失败
      return mockResponse(null, 401, '用户名或密码错误')
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    timeout: 1000,
    response: ({ headers }) => {
      // 模拟token校验
      const token = headers.authorization.replace('Bearer ', '')
      if (!token) {
        return mockResponse(null, 401, '未登录，请先登录')
      }
      return mockResponse(
        {
          nickName: Mock.mock('@cname'),
          avatar: Mock.mock('@image("100x100", "#50B347", "#fff", "admin")'),
          roles: ['admin'],
          permissions: ['*'],
        },
        200,
        '获取用户信息成功',
      )
    },
  },
] satisfies MockMethod[]
