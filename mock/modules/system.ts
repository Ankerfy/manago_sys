// \mock\modules\hotSearch.ts
import { MockMethod } from 'vite-plugin-mock'
import { mockResponse } from '../utils'

// 中文热搜词库
const HOT_SEARCH_WORDS = [
  '夫妻俩虚假报名758次公务员考试获刑, 南博镇馆之宝金兽被指脱皮掉色',
  '南博镇馆之宝金兽被指脱皮掉色',
  '2025打破纪录的高光时刻',
  '张晚意解锁新搭子奥迪E5',
  '老板监视员工微信只需300元',
  '支付宝有人转三千到我的账号',
  'iPhone18Pro左上角挖孔设计',
  '紫燕百味鸡店员偷减牛肉被抓现行',
  '不敢想中奖的我多快乐',
  '2025年度升咖艺人',
]

export default [
  {
    url: '/api/h/hot-search',
    method: 'get',
    timeout: 1000,
    response: () => {
      // 深拷贝，避免修改原数据
      const shuffledHotSearch = [...HOT_SEARCH_WORDS].sort(() => Math.random() - 0.5)
      // 截取前8个，边界兜底
      const result = shuffledHotSearch.slice(0, Math.min(8, shuffledHotSearch.length))
      return mockResponse(result)
    },
  },
] satisfies MockMethod[]
