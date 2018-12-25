import { getPermission, savePermission, deletePermission } from '@/api/power'

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
    },
    UPDATE_PERMISSION: (state, roles) => {
      state.permissionList.some(item => {
        if (item.id === roles.id) {
          Object.assign(item, roles)
          return true
        }
      })
    },
    ADD_PERMISSION: (state, data) => {
      let i = 0
      let parentIndex = 0
      state.permissionList.some((val, index) => {
        // 优先找到父节点 +1 定位为父节点第一个子节点
        if (val.id === data.parentId) {
          parentIndex = index + 1
        }
        // 查找同父节点下子节点并排序
        if (val.parentId === data.parentId) {
          // 如果当前节点已经大于添加节点则结束查找 否则暂定次级位给节点
          if (val.sort >= data.sort) {
            i = index
            return true
          } else {
            i = index + 1
          }
        }
      })
      i = i === 0 ? parentIndex : i
      state.permissionList.splice(i, 0, data)
    },
    DELETE_PERMISSION: (state, data) => {
      console.log(data)
      state.permissionList.filter(val => {
        return val.id !== data.id
      })
    }
  },

  actions: {
    // 获取规则列表
    GetPermission({ commit }) {
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
    SavePermission({ commit }, data) {
      if (data.parentId === '') {
        data['parent.id'] = 1
      }
      return new Promise((resolve, reject) => {
        savePermission(data).then(res => {
          const response = childrenBtnState(res.data.data)
          if (data.id !== '') {
            // 修改数据
            commit('UPDATE_PERMISSION', response)
          } else {
            commit('ADD_PERMISSION', response)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除菜单
    DeletePermission({ commit }, data) {
      return new Promise((resolve, reject) => {
        deletePermission(data).then(res => {
          commit('DELETE_PERMISSION', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
