import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import route from './modules/route'
import validator from './modules/validator'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    article: { namespaced: true, ...article },
    route: { namespaced: true, ...route },
    validator: { namespaced: true, ...validator },
  }
})
