import { getSysDict, getConfig } from '@/api/basicConfig'

// Dict 保留有用字段
function objectPick(data) {
  const format = ['POI', 'webType', 'yes_no']
  const res = {}
  format.forEach(item => {
    res[item] = data[item]
  })
  return res
}

// form 表单公共状态机
const basicCinfog = {
  state: {
    sysDict: {},
    footerList: [],
    webTitle: '爬虫系统'
  },
  mutations: {
    ADD_SYSDICT: (state, data) => {
      state.sysDict = data
    },
    ADD_FOOTER_LIST: (state, list) => {
      state.footerList = list
    },
    ADD_WEBTITLE: (state, title) => {
      state.webTitle = title
      window.document.title = title
    }
  },
  actions: {
    GetSysDict({ commit }) {
      getSysDict().then(res => {
        const data = res.data.data
        commit('ADD_SYSDICT', objectPick(data))
      })
    },
    GetConfig({ commit }) {
      getConfig().then(res => {
        const list = res.data.configList
        let webTitle = '爬虫系统'
        const footerList = []
        list.forEach(item => {
          if (item.configKey === 'title') {
            webTitle = item.configValue
          } else {
            footerList.push(item.configValue)
          }
        })
        commit('ADD_FOOTER_LIST', footerList)
        commit('ADD_WEBTITLE', webTitle)
      })
    }
  }
}

export default basicCinfog
