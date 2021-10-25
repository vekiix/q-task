import Api from './Api'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default ({
  computed: {
    ...mapGetters(['isAuthenticated', 'getRefreshToken'])
  },
  data () {
    return {
    }
  },
  ...mapActions(['refreshSession']),
  login (credentials) {
    return Api().post('token', credentials)
  },
  setAuthHeader (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  refreshSession () {
    try {
      console.log(this.getRefreshToken)
      var response = Api().get('token/refresh/' + this.getRefreshToken)
      this.refreshSession({
        token: response.data.token_key,
        refreshToken: response.data.refresh_token_key
      })
      this.setAuthHeader(response.data.token_key)
      alert('token refreshed!')
    } catch (error) {
      console.log(error.message)
      this.$router.push('/login')
    }
  },
  checkAuth () {
    if (this.isAuthenticated === false) {
      this.$router.push('/login')
    }
  }
})
