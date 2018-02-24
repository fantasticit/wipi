import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import route from './modules/route'

Vue.use(Vuex)

const state = {
  hasLogined: JSON.parse(window.sessionStorage.getItem('hasLogined')),
  token: window.sessionStorage.getItem('token'),
  userInfo: JSON.parse(window.sessionStorage.getItem('userInfo'))
}

const actions = {
  login({ commit }, token) {
    commit('LOG_IN', token)
  },

  logout({ commit }) {
    commit('LOG_OUT')
  },

  setUserInfo({commit}, userInfo) {
    commit('SET_USERINFO', userInfo)
  },
}

const mutations = {
  LOG_IN(state, token) {
    window.sessionStorage.setItem('hasLogined', true)
    window.sessionStorage.setItem('token', token)
  },

  LOG_OUT(state) {
    window.sessionStorage.clear()
  },

  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    article: { namespaced: true, ...article },
    route: { namespaced: true, ...route },
  }
})


// store.watch(state => state.article.tags, () => {
//   console.log('vuex tags')

//   if (state.article.tags.length <= 0) {
    
//   }
// })
store.dispatch('article/getTags')

export default store