import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Code from '../views/Code.vue'
import Activities from '../views/Activities.vue'
import Profile from '../views/Profile.vue'
import Quests from '../views/Quests.vue'
import Squad from '../views/Squad.vue'
import Login from '../views/Login.vue'
import Rankings from '../views/Rankings.vue'
import Rewards from '../views/Rewards.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
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
  },
  {
    path: '/squad',
    name: 'Squad',
    component: Squad,
  },
  {
    path: '/rankings',
    name: 'Rankings',
    component: Rankings,
  },
  {
    path: '/rewards',
    name: 'Rewards',
    component: Rewards,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
