import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchResult from './views/SearchResults.vue'
import AdminLogIn from './views/AdminLogIn.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResult
    },
    {
      path: '/admin/login',
      name: 'admin_login',
      component: AdminLogIn
    }
  ]
})
