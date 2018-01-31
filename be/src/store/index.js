import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import route from './modules/route'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    article: { namespaced: true, ...article },
    route: { namespaced: true, ...route },
  }
})
