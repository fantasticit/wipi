<template>
  <div class="ta-form-item">
    <input
      class="ta-input"
      :class="{ 'is-invalid': showInvalidTip }"
      :type="type" :placeholder="placeholder"
      ref="input"
      v-model="currentValue" @input="emitInput()"
    >
    <transition name="slide-down">
      <p 
        class="ta-form-item__invalid-tip"
        v-if="showInvalidTip">
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
          this.message = err
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
  },
}
</script>

<style lang="scss" scoped>
@include b(form-item) {
  width: 100%;
  margin-bottom: 22px;
  position: relative;

  @include when(invalid) {
    border-color: $danger;
  }

  @include e(invalid-tip) {
    position: absolute;
    margin: 0 0 0 4px;
    padding-top: 4px;
    font-size: 12px;
    color: $danger;
  }
}
</style>
