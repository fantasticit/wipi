import Vue from 'vue'
import TaIcon from './common/icon'
import TaButton from './common/button'
import TaForm from './common/form'
import TaFormItem from './common/form-item'
import TaDialog from './common/dialog'
import TaSelect from './common/select'
import TaTag from './common/tag'
import TaInput from './common/input'
import TaCollapse from './common/collapse'
import TaTable from './common/table'
import TaPagination from './common/pagination'
import TaUpload from './business/upload'
import TaContainer from './business/container'

import Message from './common/message'
import Loading from './common/loading'
import Notification from './common/notification'
import Confirm from './common/confirm'

const components = [
  TaTag,
  TaIcon,
  TaButton,
  TaForm,
  TaFormItem,
  TaDialog,
  TaSelect,
  TaUpload,
  TaCollapse,
  TaPagination,
  TaContainer,
  TaInput,
  TaTable,
]

const install = Vue => {
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$message = Message
  Vue.prototype.$message.error = msg => Message(msg, 'error')
  Vue.prototype.$message.success = msg => Message(msg, 'success')
  Vue.prototype.$message.warning = msg => Message(msg, 'warning')

  Vue.prototype.$loading = Loading

  Vue.prototype.$notify = Notification
  Vue.prototype.$notify.success = (title, msg) => Notification({ type: 'success', title, msg })
  Vue.prototype.$notify.error = (title, msg) => Notification({ type: 'error', title, msg })
  Vue.prototype.$notify.warning = (title, msg) => Notification({ type: 'info', title, msg })

  Vue.prototype.$confirm = confirm
}

if (typeof window !== 'undefined') {
  install(Vue)
}
