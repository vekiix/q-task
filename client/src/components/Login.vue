<template>
  <div class="hello">
    <div class ="padding">
        <div class="container-fluid col-xs-12">
            <div class ="row align-items-start">
                <div class="col align-self-center sm-3">
                    <h1>LOGIN Kryze4President</h1><br>
                      <input type="text" id="email" name="email" placeholder=" email" v-model="email" /> <br> <br>
                      <input type="password" id="password" name="password" placeholder=" password" v-model="password"/> <br> <br>
                      <button type="button submit" id="prijava" class="btn btn-primary" v-on:click="doLogin">Log in</button>
                      <div class= "error" v-html="error" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import Authentificator from '../services/Authentificator'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  ...mapGetters(['isAuthenticated']),
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    ...mapActions(['login', 'logout', 'setSession']),
    async doLogin () {
      try {
        if (this.isAuthenticated) {
          this.logout()
        }
        var response = await Authentificator.login({
          email: this.email,
          password: this.password
        })
        if (response.status === 200 && 'user' in response.data) {
          this.login({
            name: response.data.user.first_name + ' ' + response.data.user.last_name,
            token: response.data.token_key,
            refreshToken: response.data.refresh_token_key
          })
          Authentificator.setAuthHeader(response.data.token_key)
          this.$router.push('/authors')
        }
      } catch (err) {
        console.log(err)
        this.error = 'Incorrect username or password!'
      }
    }
  },
  beforeMount () {
    if (this.isAuthenticated) {
      this.logout()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center{
  display:flex;
  justify-content: center;
  align-items:center;
}
.padding{
  padding-top: 20vh;
}
.error{
  padding-top: 5vh;
  color: red;
}
</style>
