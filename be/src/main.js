import Vue from 'vue'
import 'normalize.css'
import App from './App'
import router from './router'
import './assets/icon/ionicons.scss'
import './components/common/message/index'
import './components/common/loadingbar/index'
import TzButton from './components/common/button'
import TzFormItem from './components/common/form-item'
import TzIcon from './components/common/icon'
import TzContainer from './components/business/container'

Vue.component('tzButton', TzButton)
Vue.component('tzFormItem', TzFormItem)
Vue.component('tzIcon', TzIcon)
Vue.component('tzContainer', TzContainer)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
