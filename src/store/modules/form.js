// form 表单公共状态机
const form = {
  state: {
    addFormLoading: false,
    pageForm: {}
  },
  mutations: {
    ADD_VIEW_FORM: (state, pgageForm) => {
      state.pageForm = Object.assign(state.pageForm, pgageForm)
    },
    UPDATE_ADDFORMLOADING: (state, type) => {
      state.addFormLoading = type
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
    },
    showAddFormLoading({ commit }) {
      commit('UPDATE_ADDFORMLOADING', true)
    },
    hideAddFormLoading({ commit }) {
      commit('UPDATE_ADDFORMLOADING', false)
    }
  }
}

export default form
