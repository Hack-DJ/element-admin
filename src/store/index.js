import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import power from './modules/power'
import dataSource from './modules/dataSource'
import form from './modules/form'
import basicCinfog from './modules/basicCinfog'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
    power,
    form,
    basicCinfog,
    dataSource
  },
  getters
})

export default store
