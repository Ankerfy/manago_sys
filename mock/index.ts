// \mock\idnex.ts
import userModule from './modules/user'
import menuModule from './modules/menu'
import monitorModule from './modules/monitor'
import systemModule from './modules/system'

const modules = [...userModule, ...menuModule, ...monitorModule, ...systemModule]

export default modules
