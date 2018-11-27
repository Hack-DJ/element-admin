import { getPermission } from '@/api/power'

const childrenBtnState = function(item) {
  const tmp = { edit: true, delete: true }
  Object.assign(item, tmp)
  if (item.children && typeof item.children === 'object') {
    item.children.map(children => {
      return childrenBtnState(children)
    })
  }
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
    // 登录
    GetPermission({ commit }, data) {
      return new Promise((resolve, reject) => {
        getPermission().then(response => {
          const data = response.data
          // 设置当前记录修改,删除按钮状态
          data.map(item => {
            return childrenBtnState(item)
          })

          commit('SET_PERMISSION', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
