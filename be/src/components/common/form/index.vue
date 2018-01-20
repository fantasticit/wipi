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

export default {
  name: 'TaForm',

  props: {
    rules: {
      type: Object,
      default: () => {}
    },
  },

  mounted() {
    this.$refs['form'].onsubmit = () => {
      const children = this.$refs['form'].querySelectorAll('input, select')
      Promise.all(Array.from(children).reduce((validates, child) => {
        const rule = child.getAttribute('data-prop')
        this.rules[rule].forEach(rule => {
          validates.push(asyncValidate(rule, child.value, child))
        })

        return validates
      }, []))
      .then(res => {
        res.forEach(dom => {
          removeClassName(dom, 'is-invalid')
          const p = dom.parentNode.querySelector('p')
          p.innerHTML = ''
          p.style.display = 'none'
        })

        this.$emit('submit')
      })
      .catch(err => {
        console.log(err)
        addClassName(err.dom, 'is-invalid')
        const p = err.dom.parentNode.querySelector('p')
        p.innerHTML = err.msg
        p.style.display = 'block'
        return false
      })

      return false
    }
  }
}
</script>
