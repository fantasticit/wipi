<template>
  <input
    class="ta-input"
    :type="type" 
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
    placeholder: { type: String, default: '请输入信息' },
  },

  data() {
    return {
      currentValue: this.$props.value,
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
