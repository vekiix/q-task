<template>
    <div>
        <div class="container-fluid col-xs-12">
            <div class ="row align-items-start">
                <div class="col align-self-center sm-3">
                    <h1 style="font-family: Impact;font-size: 3.5vh;">Popis knjiga</h1><br>
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
import Repository from '../services/Repository'

export default {
  name: 'Authors',
  data () {
    return {
      books: {}
    }
  },
  methods: {
    async fetch () {
      try {
        var response = await Repository.fetchBooks()
        this.books = response.data.items
        console.log(this.books)
      } catch (error) {
        this.$router.push('/')
      }
    },
    async deleteSelected (id) {
      try {
        await Repository.deleteBook(id)
        this.fetch()
      } catch (error) {
        alert('Slow down!\n' + error.message)
      }
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
