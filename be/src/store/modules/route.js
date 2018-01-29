const state = {
  routes: [{title: "首页", path: "/dashboard"}]
}

const actions = {
  setRoute({ commit }, route) {
    commit('SET_ROUTE', route)  
  },
}

const mutations = {
  SET_ROUTE(state, route) {
    if (state.routes.length > 1) {
      state.routes.pop()
    }
    if (route.path === state.routes[0].path) {
      return
    }
    state.routes.push(route)
  }
}

export default {
  state,
  actions,
  mutations,
}
