// @/types/menu.ts
export interface MenuItem {
  index: string
  title: string
  icon?: string
  submenu?: MenuItem[]
}

export interface MenuConfig {
  menuItems: MenuItem[]
}
