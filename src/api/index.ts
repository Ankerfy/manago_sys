// @/api/index.ts
import * as menuApi from './modules/menu'
import * as monitorApi from './modules/monitor'
import * as hotSearchApi from './modules/hotSearch'

const api = {
  monitor: monitorApi,
  menu: menuApi,
  hotSearch: hotSearchApi,
}

export type ApiType = typeof api
export default api
export { menuApi as menu, monitorApi as monitor, hotSearchApi as hotSearch }
