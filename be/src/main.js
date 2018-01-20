import Vue from 'vue'
import 'normalize.css'
import App from './App'
import router from './router'
import './assets/icon/ionicons.scss'
import './components/common/message/index'
import './components/common/loading/index'
import './components/common/loadingbar/index'
import TaIcon from './components/common/icon'
import TaButton from './components/common/button'
import TaForm from './components/common/form'
import TaFormItem from './components/common/form-item'
import TaDialog from './components/common/dialog'
import TaSelect from './components/common/select'
import TaTag from './components/common/tag'
import TaContainer from './components/business/container'

Vue.component('TaIcon', TaIcon)
Vue.component('TaButton', TaButton)
Vue.component('TaForm', TaForm)
Vue.component('TaFormItem', TaFormItem)
Vue.component('TaDialog', TaDialog)
Vue.component('TaSelect', TaSelect)
Vue.component('TaTag', TaTag)
Vue.component('TaContainer', TaContainer)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
