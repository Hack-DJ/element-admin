import { asyncRouterMap, constantRouterMap } from '@/router'
import menuList from '@/router/menuDemo/menuList'
import Vue from 'vue'

/* Layout */
import Layout from '../../views/layout/Layout'

const treeIdKey = function(list = []) {
  // 对数据进行排序
  const id = {}
  list.map(row => {
    const index = row.id
    id[index] = row
  })
  return id
}
const treeList = function(list, idKey = []) {
  const children = Vue._.groupBy(list, 'parentId')
  for (const index in idKey) {
    const row = idKey[index]
    if (children[index]) {
      row.children = children[index]
    }
  }
  return children[1]
}

function creatRoles(tree, parent) {

  tree.map(route => {
    const { href, component, redirect, icon, name } = route
    const meta = {
      title: name,
      icon: icon
    }
    const tmp = {
      path: href
    }
    if (!Vue._.startsWith(href, 'http://')) {
      const replace = Vue._.replace(href, '/', '')
      if (parent) {
        tmp.path = replace
      }
      tmp.name = Vue._.upperFirst(replace)
    }
    tmp.meta = meta
    if (route.children) {
      // 重定向位置
      tmp.redirect = redirect
      creatRoles(route.children, route)
    }
    Object.assign(route, tmp)
    route.component = component !== 'Layout' ? () => import('@/views/storeData/library/index') : Layout
  })
  return tree
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRouter(tmp.children, roles)
    }
    res.push(tmp)
  })
  return res
}

const permission = {
  state: {
    generateRoutes: [],
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.accessedRouters.concat(routers.generateRoutes)
      state.generateRoutes = routers.generateRoutes
      state.routers = constantRouterMap.concat(routers.accessedRouters, routers.generateRoutes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const idKey = treeIdKey(menuList)
        const menuTree = treeList(menuList, idKey)
        const generateRoutes = creatRoles(menuTree)
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', { accessedRouters: accessedRouters, generateRoutes: generateRoutes })
        resolve()
      })
    }
  }
}

export default permission
