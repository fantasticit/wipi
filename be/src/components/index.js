import TaIcon from './common/icon'
import TaButton from './common/button'
import TaForm from './common/form'
import TaFormItem from './common/form-item'
import TaDialog from './common/dialog'
import TaSelect from './common/select'
import TaTag from './common/tag'
import TaInput from './common/input'
import TaCollapse from './common/collapse'
import TaUpload from './business/upload'
import TaContainer from './business/container'


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
  TaContainer,
  TaInput,
]

const install = (Vue) => {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
