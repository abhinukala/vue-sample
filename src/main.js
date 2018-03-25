// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VeeValidate from 'vee-validate'
import Address from '@/components/Address'

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})
Vue.use(VeeValidate)

Vue.config.productionTip = false

Vue.component('app-address',Address)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
window.vue = Vue;
