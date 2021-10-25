<template>
<nav class="navbar sticky-top navbar-dark bg-dark fixed-bar">
  <div class="container-fluid">
    <div class="navbar-brand"><h2>Q-task</h2></div>
    <ul class="navbar-nav">
    </ul>
    <span v-if="isAuthenticated" class="navbar-text">
      NAME :{{this.currentUser}} <br>
      TOKEN :{{this.getToken}} <br>
      REFRESHTOKEN :{{this.getRefreshToken}} <br>
      EXPIRATIONDATE :{{this.getExpirationDate}} <br>
      AUTHORID : {{this.getAuthorID}}
    </span>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <button v-if="isAuthenticated" class="btn btn-primary" v-on:click="addBook()" style="margin-right:5vh;" type="button">Add new book</button>
        <button v-if="isAuthenticated" class="btn-light btn-sm btn-outline-secondary" v-on:click="doLogout()" type="button">Logout</button>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated', 'getToken', 'getRefreshToken', 'getExpirationDate', 'getAuthorID'])
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['logout']),
    doLogout () {
      this.logout()
      this.$router.push('/')
    },
    addBook () {
      this.$router.push('/addbook')
    }
  }
}

</script>

<style>
h3{
  color: white;
  font-size: 2vh;
}
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0em;
  z-index: 2;
}
h2{
  color: #F0D9FF;
  font-family: Impact;
  font-size: 3.5vh;
}
</style>
