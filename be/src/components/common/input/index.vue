<template>
  <input
    class="ta-input"
    :type="type"
    ref="input"
    :placeholder="placeholder"
    @keyup.enter="emitEnter()"
    @blur="emitBlur()"
    @focus="emitFocus()"
    v-model="currentValue" @input="emitInput()"
  >
</template>

<script>
export default {
  name: 'TaInput',

  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    focus: { type: Boolean, default: false },
    placeholder: { type: String, default: '请输入信息' },
  },

  watch: {
    value() {
      this.currentValue = this.$props.value
    }
  },

  data() {
    return {
      currentValue: this.$props.value,
    }
  },

  mounted() {
    if (this.focus) {
      this.$refs['input'].focus()
    }
  },

  methods: {
    emitInput() {
      this.$emit('input', this.currentValue)
    },

    emitEnter() {
      this.$emit('enter', this.currentValue)
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
