import { getSysDict } from '@/api/basicConfig'
// form 表单公共状态机
const basicCinfog = {
  state: {},
  mutations: {
    ADD_VIEW_FORM: (state, pgageForm) => {
      state.pageForm = Object.assign(state.pageForm, pgageForm)
    }
  },
  actions: {
    GetSysDict({ commit }, data) {
      getSysDict().then(res => {
        console.log(res)
      })
    }
  }
}

export default basicCinfog
