<template>
  <div class>
    <div class>
        <div class="container-fluid col-xs-12">
            <div class ="row align-items-start">
                <div class="col align-self-center sm-3">
                    <h1>Add a new book</h1><br>
                      <div class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Personal asset loans</a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                          <li><a href="#">asds</a></li>
                          <li class="divider"></li>
                        </ul>
                      </div>
                      <br> <br>
                      <input type="text" id="title" name="title" placeholder=" title" v-model="book.title" /> <br> <br>
                      <input type="date" id="releaseDate" name="releaseDate" placeholder=" releaseDate" v-model="book.releaseDate" /> <br> <br>
                      <input type="text" id="description" name="description" placeholder=" description" v-model="book.description" /> <br> <br>
                      <input type="text" id="isbn" name="isbn" placeholder=" isbn" v-model="book.isbn" /> <br> <br>
                      <input type="text" id="format" name="format" placeholder=" format" v-model="book.format" /> <br> <br>
                      <input type="number" id="numberOfPages" name="numberOfPages" placeholder=" Number of Pages" v-model="book.numberOfPages" /> <br> <br>
                      <button type="button submit" id="Add" class="btn btn-primary" >Add</button>
                      <div class= "error" v-html="error" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import Authentificator from '../services/Authentificator'
import Repository from '../services/Repository'

export default {
  name: 'AddBook',
  data () {
    return {
      book: {
        author: {
          id: null
        },
        title: null,
        releaseDate: null,
        description: null,
        isbn: null,
        format: null,
        numberOfPages: null
      },
      authors: {},
      error: null
    }
  },
  methods: {
    async fetch () {
      try {
        var res = await Repository.fetchAuthors()
        this.authors = res.data.items
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  beforeMount () {
    fetch()
    Authentificator.checkAuth()
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
