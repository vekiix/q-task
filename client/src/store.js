import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isAuthenticated: false,
  name: null,
  token: null,
  refreshToken: null,
  expirationDate: null,
  authorID: null
}

const mutations = {
  LOGIN_USER (state, data) {
    state.isAuthenticated = true
    state.name = data.name
    state.token = data.token
    state.refreshToken = data.refreshToken
    var currentDate = new Date()
    state.expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
      currentDate.getHours(), currentDate.getMinutes() + 10, currentDate.getSeconds())
  },
  LOGOUT_USER (state) {
    state.isAuthenticated = false
    state.name = null
    state.token = null
    state.refreshToken = null
    state.expirationDate = null
    state.authorID = null
  },
  SET_AUTHOR (state, data) {
    state.authorID = data.authorID
  },
  REFRESH_TOKEN (state, data) {
    state.token = data.token
    state.refreshToken = data.refreshToken
    var currentDate = new Date()
    state.expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
      currentDate.getHours(), currentDate.getMinutes() + 10, currentDate.getSeconds())
  }
}

const actions = {
  login (context, data) {
    sessionStorage.setItem('session', JSON.stringify(data))
    context.commit('LOGIN_USER', data)
  },
  setSession (context) {
    const session = sessionStorage.getItem('session')
    if (session && typeof session === 'string' && session !== '') {
      const data = JSON.parse(session)
      context.commit('LOGIN_USER', data)
    }
  },
  logout (context) {
    context.commit('LOGOUT_USER')
  },
  setAuthor (context, data) {
    context.commit('SET_AUTHOR', data)
  },
  renewSession (context, data) {
    context.commit('REFRESH_TOKEN', data)
  }
}

const getters = {
  isAuthenticated (state) {
    return state.isAuthenticated
  },
  currentUser (state) {
    return state.name
  },
  getToken (state) {
    return state.token
  },
  getRefreshToken (state) {
    return state.refreshToken
  },
  getExpirationDate (state) {
    return state.expirationDate
  },
  getAuthorID (state) {
    return state.authorID
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
