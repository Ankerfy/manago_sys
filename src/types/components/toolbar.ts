// @/types/toolbar.ts
import type { HeaderAction } from '@/composables/useHeaderToolbar'

// 所有toolbar支持动作类型
export type ToolbarAction = HeaderAction | 'onRefreshClick'

// 工具栏配置项原始结构
export interface ToolbarItem {
  id: string
  iconName: string | { open?: string; close?: string; dark?: string; light?: string }
  toolName: string | { open?: string; close?: string; dark?: string; light?: string }
  isDynamic?: boolean
  action?: ToolbarAction
}

// 解析后的工具栏配置项结构
export interface ProcessedToolbarItem extends ToolbarItem {
  currentIcon: string
  currentToolName: string
}

// 整个toolbar结构
export interface ProcessedToolbar {
  left: ProcessedToolbarItem[]
  right: ProcessedToolbarItem[]
}
