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
    await Api().get('token/refresh/' + store.getters.getRefreshToken)
      .then(response => {
        console.log(response)
        if (response.status !== 200) {
          console.log('Problem pri osvjezavanju tokena')
        } else {
          store.dispatch('renewSession', {
            token: response.data.token_key,
            refreshToken: response.data.refresh_token_key
          })
          this.setAuthHeader(response.data.token_key)
        }
      })
  },
  checkSession () {
    if ((store.getters.getExpirationDate < Date.now() && store.getters.getExpirationDate - Date.now() < 60000) || !store.getters.isAuthenticated) {
      return false
    } else {
      return true
    }
  }
})
