import Vue from 'vue'
import 'normalize.css'
import App from './App'
import router from './router'
import store from './store'
import './assets/icon/ionicons.scss'
import './components/index'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
