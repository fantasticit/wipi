<template>
  <div class="ta-select__container">
    <label v-if="label">{{ label }}</label>
    <select 
      class="ta-select" ref="select" :value="selected"
      :class="{ 'is-selected': hasSelected }"
      @change="emitChange($event.target.value)"
      @blur="emitBlur()"
      @focus="emitFocus()">
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="(option, index) in options" :key="index"
        :value="option[value]">
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script>
import { on } from '@/util/event'
import { asyncValidate } from '../form-item/async-validate'

export default {
  name: 'TaSelect',

  model: {
    prop: 'selected',
    event: 'change'
  },

  props: {
    value: { type: String, default: 'value' },
    selected: [String, Number],
    options: { type: Array, default: () => []},
    prop: { type: String, default: '' },
    label: { type: String, default: null },
    rules: { type: Array, default: () => [] },
    placeholder: { type: String, default: '请输入信息' },
  },

  data() {
    return {
      hasSelected: false,
    }
  },

  mounted() {
    const trigger = this.$props.rules[0] && this.$props.rules[0].trigger || 'blur'
    // 依次验证
    on(this.$refs['select'], 'change', () => {
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

  methods: {
    emitChange(value) {
      this.hasSelected = true
      this.$emit('change', value)
    },

    emitFocus() {
      this.$emit('focus')
    },

    emitBlur() {
      this.$emit('blur')
    },
  },
}
</script>
