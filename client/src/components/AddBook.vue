<template>
  <div class>
    <div class>
        <div class="container-fluid col-xs-12">
            <div class ="row align-items-start">
                <div class="col align-self-center sm-3">
                    <h1>Add a new book</h1><br>
                      <select v-model="book.author.id" name='Author' id='Author' >
                        <option v-for="value in authors" :key="value.id" v-bind:value="value.id"> {{value.first_name}} {{value.last_name}} </option>
                      </select>
                      <br> <br>
                      <input type="text" id="title" name="title" placeholder=" title" v-model="book.title" /> <br> <br>
                      <input type="datetime-local" id="releaseDate" name="releaseDate" placeholder=" releaseDate" v-model="book.release_date" /> <br> <br>
                      <input type="text" id="description" name="description" placeholder=" description" v-model="book.description" /> <br> <br>
                      <input type="text" id="isbn" name="isbn" placeholder=" isbn" v-model="book.isbn" /> <br> <br>
                      <input type="text" id="format" name="format" placeholder=" format" v-model="book.format" /> <br> <br>
                      <input type="text" id="numberOfPages" name="numberOfPages" placeholder=" Number of Pages" v-model="book.numberOfPages" /> <br> <br>
                      <button type="button submit" id="Add" v-on:click="addBook()" class="btn btn-primary" >Add</button>
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
        release_date: null,
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
    },
    async addBook () {
      try {
        var res = await Repository.addBook({
          author: {
            id: this.book.author.id
          },
          title: this.book.title,
          release_date: this.book.release_date,
          description: this.book.description,
          isbn: this.book.isbn,
          format: this.book.format,
          number_of_pages: parseInt(this.book.numberOfPages, 10)
        })
        if (res.status === 200) {
          alert('Book added successfully')
          this.$router.push('/authors')
        }
      } catch (error) {
        this.error = error.message
      }
    }
  },
  beforeMount () {
    this.fetch()
  },
  beforeCreate () {
    if (!Authentificator.checkSession()) {
      this.$router.push('/login')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  padding-top: 5vh;
  color: red;
}
</style>
