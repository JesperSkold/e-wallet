import Vue from 'vue'
import VueRouter from 'vue-router'
import AddCardPage from "../views/AddCardPage.vue"
import HomePage from "../views/HomePage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/add-card',
    name: 'AddCardPage',
    component: AddCardPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router