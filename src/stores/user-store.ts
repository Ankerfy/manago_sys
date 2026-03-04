// @/stores/user-store.ts
import { defineStore } from 'pinia'
import request from '@/api/request'

interface UserState {
  token: string
  username: string
  roles: string[]
  isLogin?: boolean
}

const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    token: '',
    username: '',
    roles: [],
    isLogin: false,
  }),
  actions: {
    async login(data: { username: string; password: string }) {
      const res = await request.post('/user/login', data)
      this.token = res.data.token
      this.username = res.data.username
      this.roles = res.data.roles
      this.isLogin = true
    },
    logout() {
      this.$reset() // 清空状态
    },
  },
  persist: {
    key: '',
    storage: sessionStorage,
    paths: ['token', 'username', 'roles'],
  },
})
