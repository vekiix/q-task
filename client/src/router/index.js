import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Books from '@/components/Books'
import Authors from '@/components/Authors'
import AddBook from '@/components/AddBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/authors',
      name: 'Authors',
      component: Authors
    },
    {
      path: '/addbook',
      name: 'AddBook',
      component: AddBook
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
