// @/stores/index.ts
// 所有 store 的统一出口
export { useAppStore } from './app-store'
export { useUIStore } from './ui-store'

// 重新导出所有，便于自动导入和类型聚合
export * from './app-store'
export * from './ui-store'
