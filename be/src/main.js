import Vue from 'vue'
import 'normalize.css'
import App from './App'
import router from './router'
import FaFormItem from './components/common/form-item'

Vue.component('faFormItem', FaFormItem)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
