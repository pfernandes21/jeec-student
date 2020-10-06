import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import PortalVue from 'portal-vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap'; 
// import 'bootstrap/dist/css/bootstrap.min.css';

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
// Vue.use(PortalVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
