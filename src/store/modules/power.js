import { getPermission, savePermission } from '@/api/power'

const childrenBtnState = function(item) {
  const tmp = { edit: true, delete: true }
  item.type = parseInt(item.type) === 1 ? '菜单' : '按钮'
  Object.assign(item, tmp)
  return item
}
const user = {
  state: {
    permissionList: []
  },

  mutations: {
    SET_PERMISSION: (state, roles) => {
      state.permissionList = roles
    }
  },

  actions: {
    // 获取规则列表
    GetPermission({ commit }, data) {
      return new Promise((resolve, reject) => {
        getPermission().then(response => {
          const data = response.data.list
          // 格式化当前数据,并设置修改,删除按钮
          data.map(item => {
            return childrenBtnState(item, data)
          })
          commit('SET_PERMISSION', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 保存菜单
    SavePermission({ commit, state, getters }, data) {
      return new Promise((resolve, reject) => {
        savePermission(data).then(response => {
          if (data.id !== '') {
            // 次数据为修改数据
            getters.permissionIdKey[data.id] = Object.assign(getters.permissionIdKey[data.id], data)
          }
          // 格式化当前数据,并设置修改,删除按钮
          // const data = childrenBtnState(response.data)
          /**
           * 判断当前数据是否顶级菜单
           * 顶级菜单根据排序查找插入位置
           */

          /**
           * 次级菜单,优先记录父级菜单位置,再找同级菜单
           * ,根据同级菜单排序查找插入位置,
           * 如果没有同级菜单则插入父级菜单后
           */

          // 遍历数据插入
          // state.permissionList.forEach(item => {})
          // commit('SET_PERMISSION', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
