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
          if (response.status !== 200) {
            this.$router.push('/login')
          } else {
            store.dispatch('renewSession', {
              token: response.data.token_key,
              refreshToken: response.data.refresh_token_key
            })
            this.setAuthHeader(response.data.token_key)
          }
        })
    } catch (error) {
      console.log(error.message)
      this.$router.push('/login')
    }
  },
  checkSession () {
    if (store.getters.getExpirationDate < Date.now() || !store.getters.isAuthenticated) {
      return false
    } else {
      return true
    }
  }
})
