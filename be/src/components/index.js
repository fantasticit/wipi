import Vue from 'vue'
import TaRow from './common/row'
import TaCol from './common/col'
import TaAlert from './common/alert'
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
import notification from './common/notification'
import { confirm, prompt } from './common/messagebox/index'

const components = [
  TaRow,
  TaCol,
  TaAlert,
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
  Vue.prototype.$message.info = msg => Message(msg, 'info')

  Vue.prototype.$loading = Loading

  Vue.prototype.$notify = notification
  Vue.prototype.$notify.success = (title, msg) => notification({ type: 'success', title, msg })
  Vue.prototype.$notify.error = (title, msg) => notification({ type: 'error', title, msg })
  Vue.prototype.$notify.warning = (title, msg) => notification({ type: 'info', title, msg })

  Vue.prototype.$confirm = confirm
  Vue.prototype.$prompt = prompt
}

if (typeof window !== 'undefined') {
  install(Vue)
}
