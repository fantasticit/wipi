const state = {
  validators: []
}

const actions = {
  addValidator({ commit }, validator) {
    commit('ADD_VALIDATOR', validator)
  }
}

const mutations = {
  ADD_VALIDATOR(state, validator) {
    state.validators.push(validator)
  }
}

export default {
  state,
  actions,
  mutations,
}
