import Api from './Api'
import axios from 'axios'
import store from '../store'

export default ({
  data () {
    return {
    }
  },
  login (credentials) {
    return Api().post('token', credentials)
  },
  setAuthHeader (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  async refreshSession () {
    try {
      await Api().get('token/refresh/' + store.getters.getRefreshToken)
        .then(response => {
          console.log(response)
          store.dispatch('renewSession', {
            token: response.data.token_key,
            refreshToken: response.data.refresh_token_key
          })
          this.setAuthHeader(response.data.token_key)
        })
    } catch (error) {
      alert('Problem while refreshing session!')
    }
  },
  checkSession () {
    if (store.getters.getExpirationDate - Date.now() > 0) {
      if (store.getters.getExpirationDate - Date.now() < 60000) {
        this.refreshSession()
      }
      return true
    } else {
      alert('Session expired. Please sign in again!')
      return false
    }
  }
})
