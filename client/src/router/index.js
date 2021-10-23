import Vue from 'vue'
import VueSession from 'vue-session'
import Router from 'vue-router'
import Login from '@/components/Login'
import Authors from '@/components/Authors'

var options = {
  persist: true
}

Vue.use(VueSession, options)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/authors',
      name: 'Authors',
      component: Authors
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
