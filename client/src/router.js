import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchResult from './views/SearchResults.vue'
import AdminLogIn from './views/AdminLogIn.vue'
import AdminDashboard from './views/AdminDashboard'
import BookedApartment from '@/components/BookedApartments.vue'
import ContactUs from './views/ContactUs'
import Apartments from './views/Apartments'

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
      path: '/apartments',
      name: 'apartments',
      component: Apartments
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactUs,
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: AdminLogIn
    },
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: AdminDashboard,
      children: [
        {
          path: 'booked',
          component: BookedApartment
        }
      ]
    }
  ]
})
