<template>
    <div>
        <div class="container-fluid col-xs-12">
            <div class ="row align-items-start">
                <div class="col align-self-center sm-3">
                    <h1 style="font-family: Impact;font-size: 3.5vh;">Popis autora</h1><br>
                    <table class ="table">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>First Name</th>
                                <th scope='col'>Last Name</th>
                                <th scope='col'>Birthday</th>
                                <th scope='col'>Gender</th>
                                <th scope='col'>Place of Birth</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                          <tbody>
                            <tr v-for="value in authors" :key="value.id">
                                <th scope ="row">{{value.id}} </th>
                                <th scope ="row">{{value.first_name}} </th>
                                <th scope ="row">{{value.last_name}} </th>
                                <th scope ="row">{{value.birthday}} </th>
                                <th scope ="row">{{value.gender}} </th>
                                <th scope ="row">{{value.place_of_birth}} </th>
                                <th scope ="row"><button v-on:click="redirect(value.id)" type="button submit" class="btn btn-primary">Pregledaj knjige autora</button></th>
                            </tr>
                          </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Repository from '../services/Repository'
import Authentificator from '../services/Authentificator'

export default {
  name: 'Authors',
  data () {
    return {
      authors: {}
    }
  },
  methods: {
    ...mapActions(['setAuthor']),
    async fetch () {
      try {
        var response = await Repository.fetchAuthors()
        this.authors = response.data.items
        console.log(this.authors)
      } catch (error) {
        console.log(error.message)
        this.$router.push('/login')
      }
    },
    redirect (id) {
      console.log(id)
      this.setAuthor({
        authorID: id
      })
      this.$router.push('/books')
    }
  },
  beforeMount () {
    if (!Authentificator.checkSession()) {
      this.$router.push('/login')
    } else {
      Authentificator.refreshSession()
    }
    this.fetch()
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
