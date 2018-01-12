<template>
  <div class="fa-form-item" ref="formItem">
    <input
      class="fa-input"
      :class="{ 'is-invalid': showInvalidTip }"
      :type="type" :placeholder="placeholder"
      :required="required"
      v-model="currentValue" @change="emitInput()"
    >
    <transition name="slide-down">
      <p 
        class="fa-form-item__invalid-tip"
        v-if="showInvalidTip">
        {{ invalidTip }}
      </p>
    </transition>
  </div>
</template>

<script>
import { on } from '@/util/event'

export default {
  name: 'FaFormItem',
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    trigger: { type: String, default: 'input' },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '请输入信息' },
    invalidTip: { type: String, default: '该项不通过' },
  },
  mounted() {
    on(this.$refs['formItem'].querySelector('input'), this.trigger, this.validate)
  },
  data() {
    return {
      currentValue: this.$props.value,
      showInvalidTip: false,
    }
  },
  methods: {
    emitInput() {
      this.$emit('input', this.currentValue)
    },
    validate() {
      if (this.required && !this.currentValue) {
        this.showInvalidTip = true
      } else {
        this.showInvalidTip = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
