import { getRoutersConfig, setRoutersConfig, getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute, routeHasExist, getLocalStorage } from '@/libs/util'
import { staticRouters } from '@/router/routersMap'
import _ from 'lodash'
export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(getRoutersConfig()),
    routersConfig: getRoutersConfig(),
    local: ''
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(state.routersConfig, rootState.user.access || getLocalStorage('access').split(','))
  },
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList (state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag (state, { route, type = 'unshift' }) {
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === 'push') state.tagNavList.push(route)
        else {
          if (route.name === 'home') state.tagNavList.unshift(route)
          else state.tagNavList.splice(1, 0, route)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setRoutersConfig (state, { newRouters, routersData }) {
      state.routersConfig = _.concat(staticRouters, newRouters)
      state.homeRoute = getHomeRoute(state.routersConfig)
      setRoutersConfig(routersData)
    },
    setLocal (state, lang) {
      state.local = lang
    }
  }
}
