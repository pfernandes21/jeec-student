import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Code from "../views/Code.vue";
import Activities from "../views/Activities.vue";
import Profile from "../views/Profile.vue";
import Quests from "../views/Quests.vue";
import Squad from "../views/Squad.vue";
import Login from "../views/Login.vue";
import Rankings from "../views/Rankings.vue";
import Rewards from "../views/Rewards.vue";
import Chat from "../views/Chat.vue";
import Company from "../views/Company.vue";
import Companies from "../views/Companies.vue";
import Rules from "../views/Rules.vue";
import qs from "qs";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/code",
    name: "Code",
    component: Code
  },
  {
    path: "/activities",
    name: "Activities",
    component: Activities
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/quests",
    name: "Quests",
    component: Quests
  },
  {
    path: "/squad",
    name: "Squad",
    component: Squad
  },
  {
    path: "/rankings",
    name: "Rankings",
    component: Rankings
  },
  {
    path: "/rewards",
    name: "Rewards",
    component: Rewards
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  },
  {
    path: "/company/:name",
    name: "Company",
    component: Company
  },
  {
    path: "/companies",
    name: "Companies",
    component: Companies
  },
  {
    path: "/rules",
    name: "Rules",
    component: Rules
  },
  { path: "*", component: Login },
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  stringifyQuery: query => {
    let result = qs.stringify(query, { format: "RFC1738" });
    return result ? "?" + result : "";
  },
  routes
});

export default router;
