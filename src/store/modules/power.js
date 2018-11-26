import { getPermission } from '@/api/power'

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
          const data = response.body
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
