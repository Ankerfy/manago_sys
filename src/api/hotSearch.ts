// @/api/hotSearch.ts
import api from './apiClient'

const mockHotSearches = () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([
        'AI 大模型突破',
        '某明星官宣恋情',
        '世界杯决赛精彩瞬间',
        '新能源汽车补贴政策',
        '高考志愿填报指南',
      ])
    }, 500)
  })
}

// 定义API响应类型
interface ApiResponse<T> {
  code?: number
  message?: string
  data: T
}

export const fetchHotSearch = async (): Promise<string[]> => {
  try {
    // 跳过自动解包
    const res = await api.get<ApiResponse<string[]>>('/hot-search', {
      custom: { skipDataWrap: true },
    })

    if (res.data && res.data.data) {
      return res.data.data
    } else {
      throw new Error('返回数据为空')
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || err.message || '获取热搜失败'
    throw new Error(msg)
  }
}

// 本地模拟数据
export const useHotSearch = () => {
  const hotSearches = ref<string[]>([])
  const loading = ref(false)

  const fetchHotSearch = async () => {
    loading.value = true
    try {
      hotSearches.value = await mockHotSearches()
    } catch (error) {
      console.error('获取热搜失败', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchHotSearch()
  })

  return { hotSearches, loading, fetchHotSearch }
}
