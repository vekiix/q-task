<template>
    <div>
        <div class="container-fluid col-xs-12">
            <div class ="row align-items-start">
                <div class="col align-self-center sm-3">
                  <div class="d-flex flex-row">
                    <br>
                    <h1 style="font-family: Impact;font-size: 2vh;text-align:left;">
                    {{this.author.id}}<br>
                    {{this.author.firstName}}<br>
                    {{this.author.lastName}}<br>
                    {{this.author.birthday}}<br>
                    {{this.author.gender}}<br></h1>
                  </div>
                    <div style="float:left;">
                      <button type="button submit" v-if="books.length===0" v-on:click="deleteAuthor" class="btn btn-primary">Delete Author</button><br>
                    </div>
                    <br><br><h1 style="font-family: Impact;font-size: 3.5vh;">Popis knjiga</h1><br>
                    <table class ="table">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Release Date</th>
                                <th scope='col'>ISBN</th>
                                <th scope='col'>Format</th>
                                <th scope='col'>Number of pages</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="value in books" :key="value.id">
                                <th scope ="row">{{value.id}} </th>
                                <th scope ="row">{{value.title}} </th>
                                <th scope ="row">{{value.release_date}} </th>
                                <th scope ="row">{{value.isbn}} </th>
                                <th scope ="row">{{value.format}} </th>
                                <th scope ="row">{{value.number_of_pages}} </th>
                                <th scope ="row"><button type="button submit" v-on:click="deleteSelected(value.id)" class="btn btn-primary">Delete</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Authentificator from '../services/Authentificator'
// import Authentificator from '../services/Authentificator'
import Repository from '../services/Repository'

export default {
  name: 'Books',
  computed: {
    ...mapGetters(['getAuthorID'])
  },
  data () {
    return {
      author: {
        id: null,
        firstName: null,
        lastName: null,
        birthday: null,
        gender: null
      },
      books: {}
    }
  },
  methods: {
    async fetch () {
      try {
        var res = await Repository.fetchAuthor(this.getAuthorID)
        this.author.id = res.data.id
        this.author.firstName = res.data.first_name
        this.author.lastName = res.data.last_name
        this.author.birthday = res.data.birthday
        this.author.gender = res.data.gender
        this.books = res.data.books
      } catch (error) {
        this.$router.push('/authors')
      }
    },
    async deleteSelected (id) {
      try {
        await Repository.deleteBook(id)
        this.fetch()
      } catch (error) {
        alert('Slow down!\n' + error.message)
      }
    },
    async deleteAuthor () {
      try {
        await Repository.deleteAuthor(this.author.id)
        this.$router.push('/authors')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  beforeCreate () {
    if (!Authentificator.checkSession()) {
      this.$router.push('/login')
    }
  },
  beforeMount () {
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
