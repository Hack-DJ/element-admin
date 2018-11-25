const app = {
  state: {
    pages: {}
  },
  mutations: {
    ADD_VIEW_CACHE(state, view) {
      state.pages[view.name] = view.form
    }
  },
  actions: {
    addViewCache: ({ commit }, data) => {
      commit('ADD_VIEW_CACHE', data)
    }
  }
}

export default app
