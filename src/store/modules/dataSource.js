// import { getType, getInfo, getStrategy, getList } from '@/api/dataSource'
import { getType } from '@/api/dataSource'

const dataSource = {
  state: {
    typeList: []
  },

  mutations: {
    SET_TYPELIST: (state, roles) => {
      state.typeList = roles
    }
  },

  actions: {
    // 获取规则列表
    GetDataSourceType({ commit }) {
      return new Promise((resolve, reject) => {
        getType().then(response => {
          const data = response.data.list
          commit('SET_TYPELIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dataSource
