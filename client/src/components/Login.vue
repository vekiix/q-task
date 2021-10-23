<template>
  <div class="hello">
    <div class ="padding">
        <div class="container-fluid col-xs-12">
            <div class ="row align-items-start">
                <div class="col align-self-center sm-3">
                    <h1>LOGIN Kryze4President</h1><br>
                      <input type="text" id="email" name="email" placeholder=" email" v-model="email" /> <br> <br>
                      <input type="password" id="password" name="password" placeholder=" password" v-model="password"/> <br> <br>
                      <button type="button submit" id="prijava" class="btn btn-primary" v-on:click="login">Log in</button>
                      <div class= "error" v-html="error" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Authentificator from '../services/Authentificator'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login () {
      try {
        if (this.$session.exists()) {
          this.$session.destroy()
        }
        var response = await Authentificator.login({
          email: this.email,
          password: this.password
        })
        if (response.status === 200 && 'user' in response.data) {
          await this.$session.start()
          await this.$session.set('jwt', response.data.token_key)
          await this.$session.set('firsName', response.data.user.first_name)
          await this.$session.set('lastName', response.data.user.last_name)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token_key
          this.$router.push('/authors')
        }
      } catch (err) {
        console.log(err)
        this.error = 'Incorrect username or password!'
      }
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
