import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddApartment from '@/components/AddApartment'
import SearchPage from './views/SearchPage.vue'
import AdminLogIn from './views/AdminLogIn.vue'
import AdminDashboard from './views/AdminDashboard'
import DashboardSearch from '@/components/DashboardSearch.vue'
import ContactUs from './views/ContactUs'
import Apartments from './views/Apartments'
import SubmitListing from './views/SubmitListing';
import DashboardListing from '@/components/DashboardListings'
import PageNotFound from './views/PageNotFound'

Vue.use(Router)

const router = new Router({
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
      component: SearchPage
    },
    {
      path: '/apartments',
      name: 'apartments',
      component: Apartments
    },
    {
      path: '/new_listing',
      name: 'newListing',
      component: SubmitListing
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactUs,
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: AdminLogIn,
      meta: {
        guest: true,
      }
    },
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: AdminDashboard,
      children: [
        {
          path: '',
          component: DashboardSearch,
          name: 'dashboardSearch'
        },
        {
          path:'add_apartment',
          component: AddApartment,
          name: 'addApartment'
        },
        {
          path:'edit_apartment/:id',
          component: AddApartment,
          name: 'editApartment',
        },
        {
          path: 'listings',
          component: DashboardListing,
          name: 'dashboardListing'
        }
      ],
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem('token') == null){
      next({
        path: '/admin/login',
        params: {nextUrl: to.fullPath}
      })
    }else{
      next();
    }
  }else if(to.matched.some(record => record.meta.guest)){
    if(localStorage.getItem('token') == null){
      next()
    }else{
      next({name: 'dashboardSearch'})
    }
  }else{
    next();
  }

})

export default router;
