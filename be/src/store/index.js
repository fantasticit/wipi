import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import route from './modules/route'

Vue.use(Vuex)

const state = {
  hasLogined: JSON.parse(window.sessionStorage.getItem('hasLogined')),
  userInfo: JSON.parse(window.sessionStorage.getItem('userInfo'))
            || {}
}

const actions = {
  login({ commit }, userInfo) {
    commit('LOG_IN', userInfo)
  },

  logout({ commit }) {
    commit('LOG_OUT')
  },
}

const mutations = {
  LOG_IN(state, userInfo) {
    window.sessionStorage.setItem('hasLogined', true)
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  },

  LOG_OUT(state) {
    window.sessionStorage.setItem('hasLogined', false)
    window.sessionStorage.setItem('userInfo', JSON.stringify({}))
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    article: { namespaced: true, ...article },
    route: { namespaced: true, ...route },
  }
})
