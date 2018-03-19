<template>
  <form ref="form">
    <slot></slot>
  </form>
</template>

<script>
import { 
  addClassName, 
  removeClassName 
} from '@/util/class-name'
import { asyncValidate } from '../form-item/async-validate'
import Store from '../form-item/store'

export default {
  name: 'TaForm',

  mounted() {
    this.$refs['form'].onsubmit = () => {
      const children = this.$refs['form'].querySelectorAll('input, select')
      const validates = Array.from(children).reduce((validates, child) => {
        const formItem = child.getAttribute('data-prop')
        validates.push(...Store.get(formItem))
        return validates
      }, [])

      Promise.all(validates.map(validate => validate()))
        .then(res => {
          this.$emit('submit')
        })
        .catch(err => {
          err.vm.showInvalidTip = true
          err.vm && (err.vm.message = err.msg)
          return false
        })

      return false
    }
  }
}
</script>
