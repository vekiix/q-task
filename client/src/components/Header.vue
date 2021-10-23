<template>
<nav class="navbar sticky-top navbar-dark bg-dark fixed-bar">
  <div class="container-fluid">
    <div class="navbar-brand"><h2>Q-task</h2></div>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <h3 v-if="this.$session.firstName !== undefined">{{this.$session.firstName + ' ' + this.$session.last_name}}</h3>
      </li>
    </ul>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <button v-if="this.loggedIn" class="btn-light btn-sm btn-outline-secondary" type="button">Logout</button>
      </li>
    </ul>
    </div>
</nav>
</template>

<script>
// import session from '../services/Session'
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      loggedIn: false
    }
  },
  methods: {
    fill () {
      this.loggedIn = true
    }
  }
}
</script>

<style>
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
