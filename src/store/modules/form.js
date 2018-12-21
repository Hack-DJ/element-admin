// form 表单公共状态机
const form = {
  state: {
    pageForm: {}
  },
  mutations: {
    ADD_VIEW_FORM: (state, pgageForm) => {
      state.pageForm = Object.assign(state.pageForm, pgageForm)
    }
  },
  actions: {
    addViewForm({ commit }, data) {
      const { route, ...obj } = data
      const page = {
        [route.name]: obj
      }
      commit('ADD_VIEW_FORM', page)
      // formData: {},
      // rules: {},
      // itemList: {},
      // treeList: [],
      // treeIdKey: {}
    }
  }
}

export default form
