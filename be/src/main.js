import Vue from 'vue'
import 'normalize.css'
import App from './App'
import router from './router'
import store from './store'
import './assets/icon/ionicons.scss'
import './components/index'
import './util/performence/first-screen'
import { on } from './util/event'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
