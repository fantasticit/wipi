import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import route from './modules/route'

Vue.use(Vuex)

const state = {
  hasLogined: JSON.parse(window.sessionStorage.getItem('hasLogined')),
  token: window.sessionStorage.getItem('token'),
}

const actions = {
  login({ commit }, token) {
    commit('LOG_IN', token)
  },

  logout({ commit }) {
    commit('LOG_OUT')
  },
}

const mutations = {
  LOG_IN(state, token) {
    window.sessionStorage.setItem('hasLogined', true)
    window.sessionStorage.setItem('token', token)
  },

  LOG_OUT(state) {
    window.sessionStorage.clear()
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
