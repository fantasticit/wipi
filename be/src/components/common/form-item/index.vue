<template>
  <div class="ta-form-item">
    <label v-if="label" :for="prop">{{ label }}</label>
    <input
      :id="prop"
      class="ta-input"
      :class="{ 'is-invalid': showInvalidTip }"
      :type="type" :placeholder="placeholder"
      :data-prop="prop"
      ref="input"
      @keyup.enter="emitEnter()"
      v-model="currentValue" @input="emitInput()"
    >
    <transition name="slide-down">
      <p
        class="ta-form-item__invalid-tip"
        :style="{ left: label ? '6em' : '0' }"
        v-show="showInvalidTip">
        {{ message }}
      </p>
    </transition>
  </div>
</template>

<script>
import { on } from '@/util/event'
import { asyncValidate } from './async-validate'

export default {
  name: 'TaFormItem',

  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    prop: { type: String, default: '' },
    label: { type: String, default: null },
    rules: { type: Array, default: () => [] },
    placeholder: { type: String, default: '请输入信息' },
  },

  mounted() {
    const trigger = this.$props.rules[0] && this.$props.rules[0].trigger || 'blur'
    // 依次验证
    on(this.$refs['input'], trigger, () => {
      Promise.all(this.$props.rules.reduce((validates, rule) => {
        validates.push(asyncValidate(rule, this.currentValue))
        return validates
      }, []))
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
  },

  data() {
    return {
      currentValue: this.$props.value,
      showInvalidTip: false,
      message: ''
    }
  },

  methods: {
    emitInput() {
      this.$emit('input', this.currentValue)
    },

    emitEnter() {
      this.$emit('enter', this.currentValue)
      this.currentValue = ''
    },
  },
}
</script>
