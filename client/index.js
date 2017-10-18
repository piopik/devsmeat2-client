import Vue from 'vue'

import store from './store'

import App from './components/App.vue'
import './promise-polyfill'

if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

const app = new Vue({
  store,
  ...App
})

app.$mount('#app')
