// \mock\hotSearch.ts
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

// 中文热搜词库
const HOT_SEARCH_WORDS = [
  'AI 大模型开源',
  '国产芯片突破',
  '高考分数线公布',
  '暑期旅游高峰',
  '新能源汽车补贴',
  '奥运会资格赛',
  '某地暴雨预警',
  '新电影票房破亿',
  '高校招生政策调整',
  '数字人民币试点扩大',
]

export default [
  {
    url: '/api/hot-search',
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

// export default [
//   {
//     url: '/api/hot-search',
//     method: 'get',
//     response: () => {
//       const data = Mock.mock({
//         'list|10': [
//           {
//             'id|+1': 1,
//             word: '@ctitle(8, 15)',
//             'hot|1000-10000000': 1,
//             icon: '@boolean',
//           },
//         ],
//       }).list
//       return {
//         code: 200,
//         message: 'success',
//         data: data.map((item) => item.word),
//       }
//     },
//   },
// ] satisfies MockMethod[]
