import Vue from 'vue'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'
import router from './router'

import Card from '../src/components/Card.vue'
Vue.component('my-card', Card)

import ListCard from '../src/components/ListCard.vue'
Vue.component('my-list-card', ListCard)

Vue.config.productionTip = false


import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})

import filters from './assets/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')