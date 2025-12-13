// @/api/hotSearch.ts

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

// mock工具
export const fetchHotSearch = async (): Promise<string[]> => {
  const res = await fetch('/api/hot-search')
  const result = await res.json()
  if (result.code === 200) {
    return result.data
  }
  throw new Error(result.message || '获取热搜失败')
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
