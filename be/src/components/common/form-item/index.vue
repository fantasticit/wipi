<template>
  <div class="ta-form-item">
    <label v-if="label" :for="prop">{{ label }}</label>
    <input
      :id="prop"
      class="ta-input"
      :class="{ 'is-invalid': showInvalidTip }"
      :type="type" :placeholder="placeholder"
      :data-prop="prop"
      autocomplete="false"
      ref="input"
      @keyup.enter="emitEnter()"
      v-model="currentValue" 
      @input="emitInput()"
      @blur="emitBlur()"
    >
    <transition name="slide-down">
      <p
        class="ta-form-item__invalid-tip"
        :style="{ left: label ? '5em' : '-2px' }"
        v-show="showInvalidTip">
        {{ message }}
      </p>
    </transition>
  </div>
</template>

<script>
import { on } from '@/util/event'
import Store from './store'
import { asyncValidate } from './async-validate'

export default {
  name: 'TaFormItem',

  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    prop: { type: String, default: '' },
    label: { type: String, default: null },
    rules: { type: Array, default: () => [] },
    validator: { type: Function, default: () => [] },
    focus: { type: Boolean, default: false },
    placeholder: { type: String, default: '请输入信息' },
  },

  mounted() {
    const trigger = this.$props.rules[0] && this.$props.rules[0].trigger || 'blur'
    const validates = this.$props.rules.reduce((validates, rule) => {
      const fn = asyncValidate(rule, this)
      validates.push(fn)
      return validates
    }, [])

    validates.push(() => new Promise(async (resolve, reject) => {
      const err = await this.validator(null)

      if (err.message) {
        reject({
          msg: err && err.message || '发生错误',
          vm: this,
        })
      } else {
        resolve(this)
      }
    }))

    Store.set(this.prop, validates)
    // 依次验证
    on(this.$refs['input'], trigger, () => {
      Promise.all(validates.map(validate => validate()))
        .then(msg => {
          this.showInvalidTip = false
          this.message = ''
          // 验证通过
          this.$emit('success', true)
        })
        .catch(err => {
          this.showInvalidTip = true
          this.message = err.msg
          // 验证失败
          this.$emit('fail', false)
        })
    })

    if (this.focus) {
      this.$refs['input'].focus()
    }
  },

  watch: {
    value() {
      this.currentValue = this.$props.value
    }
  },

  data() {
    return {
      currentValue: '',
      showInvalidTip: false,
      message: ''
    }
  },

  methods: {
    emitInput(value) {
      this.$emit('input', this.currentValue)
    },

    emitEnter() {
      this.$emit('enter', this.currentValue)
    },

    emitBlur() {
      this.$emit('blur', this.currentValue)
    },
  },
}
</script>
