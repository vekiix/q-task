import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    isAuthenticated: false,
    name: null
  }
}
const mutations = {
  LOGIN_USER (state, name) {
    state.user.isAuthenticated = true
    state.user.name = { name }
  },
  LOGOUT_USER (state) {
    state.user.isAuthenticated = false
    state.user.name = null
  }
}

const actions = {
  login (context, name) {
    context.commit('LOGIN_USER', name)
  },
  logout (context) {
    context.commit('LOGOUT_USER')
  }
}

const getters = {
  isAuthenticated (state) {
    return state.user.isAuthenticated
  },
  currentUser (state) {
    return state.user.name
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
