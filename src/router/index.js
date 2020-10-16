import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Code from '../views/Code.vue'
import Activities from '../views/Activities.vue'
import Profile from '../views/Profile.vue'
import Quests from '../views/Quests.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/code',
    name: 'Code',
    component: Code,
  },
  {
    path: '/activities',
    name: 'Activities',
    component: Activities,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/quests',
    name: 'Quests',
    component: Quests,
  }
]

const router = new VueRouter({
  routes
})

export default router
