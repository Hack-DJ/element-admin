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
      if (data.parentId === 1 || data.parentId === '1') {
        state.permissionList.some((val, index) => {
          if (val.parentId === data.parentId && val.sort > data.sort) {
            i = index
            return true
          }
        })
        console.log(i)
        state.permissionList.splice(i, 0, data)
      }
      // state.permissionList.push(data)
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
    SavePermission({ commit, state, getters }, data) {
      if (data.parentId === '') {
        data['parent.id'] = 1
      }
      return new Promise((resolve, reject) => {
        savePermission(data).then(res => {
          const response = childrenBtnState(res.data.data)
          if (data.id !== '') {
            // 修改数据
            commit('UPDATE_PERMISSION', response)
            // getters.permissionIdKey[data.id] = Object.assign(getters.permissionIdKey[data.id], response)
          } else {
            console.log('新增')
            commit('ADD_PERMISSION', response)
            /**
             * 判断当前数据是否顶级菜单
             * 顶级菜单根据排序查找插入位置
             */
            // if (data['parent.id'] === 1) {
            //   let i = 0
            //   state.some((val, index) => {
            //     if (val.sort < response.sort) {
            //       i = index
            //       return true
            //     }
            //   })
            //   commit('ADD_PERMISSION', { index: i, roles: response })
            // }
          }
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
