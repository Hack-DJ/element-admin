import groupBy from 'lodash/groupBy'

const permissionIdKey = function(list = []) {
  // 对数据进行排序
  const id = {}
  list.map(row => {
    const index = row.id
    id[index] = row
  })
  return id
}
const generationTree = function(list, idKey = []) {
  const children = groupBy(list, 'parentId')
  for (const index in idKey) {
    const row = idKey[index]
    if (children[index]) {
      row.children = children[index]
    }
  }
  return children[1]
}

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,

  addFormLoading: state => state.form.addFormLoading,
  roleType: state => state.form.roleType,

  permissionList: state => state.power.permissionList,
  permissionIdKey: (state, getters) => {
    return permissionIdKey(getters.permissionList)
  },
  generationTree: (state, getters) => {
    return generationTree(getters.permissionList, getters.permissionIdKey)
  },

  dataSourceTypeList: state => state.dataSource.typeList,
  dataSourceTypeIdKey: (state, getters) => {
    return permissionIdKey(getters.dataSourceTypeList)
  },
  dataSourceTypeTree: (state, getters) => {
    return generationTree(getters.dataSourceTypeList, getters.dataSourceTypeIdKey)
  },

  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
