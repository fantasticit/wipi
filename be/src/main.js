import Vue from 'vue'
import 'normalize.css'
import App from './App'
import router from './router'
import './assets/icon/ionicons.scss'
import './components/common/message/index'
import './components/common/loadingbar/index'

import FaButton from './components/common/button'
import FaFormItem from './components/common/form-item'
import FaIcon from './components/common/icon'

Vue.component('faButton', FaButton)
Vue.component('faFormItem', FaFormItem)
Vue.component('faIcon', FaIcon)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
