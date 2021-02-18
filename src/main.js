import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import store from './store'
import VueCryptojs from 'vue-cryptojs'
import VueGtag from "vue-gtag";
 
Vue.use(VueCryptojs)
Vue.use(VueGtag, {
  config: { id: "UA-189974022-1" },
  pageTrackerTemplate(to) {
    return {
      page_title: to.name,
      page_path: to.path,
    }
  }
}, 
  router);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Vuex,
  store,
  render: h => h(App)
}).$mount('#app')
