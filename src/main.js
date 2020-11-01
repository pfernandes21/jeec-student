import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Vuex,
  store,
  render: h => h(App)
}).$mount('#app')
