import './promise-polyfill'
import { app } from './app'

if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

app.$mount('#app')
