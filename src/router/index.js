import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Code from '../views/Code.vue'
import Activities from '../views/Activities.vue'
import Profile from '../views/Profile.vue'
import Quests from '../views/Quests.vue'
import Team from '../views/Team.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
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
    path: '/team',
    name: 'Team',
    component: Team,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
