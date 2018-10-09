import { getRouterReq } from '@/api/routers'
import { routersConfigAssembly } from '@/libs/util'
import store from '@/store'
import _ from 'lodash'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export const reqRoutersConfig = () => {
  return getRouterReq().then((routersData) => {
    let routersConfig = _.cloneDeep(routersData.data)
    let newRoutersConfigObj = routersConfigAssembly(routersConfig)
    store.commit('setRoutersConfig', { newRouters: newRoutersConfigObj, routersData: routersData.data })
    return newRoutersConfigObj
  })
}
