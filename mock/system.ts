// \mock\hotSearch.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

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
    response: () => {
      const shuffled = [...HOT_SEARCH_WORDS].sort(() => Math.random() - 0.5).slice(0, 8)
      return {
        code: 200,
        message: 'success',
        data: shuffled,
      }
    },
  },
] satisfies MockMethod[]
