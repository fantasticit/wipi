<template>
  <button class="tz-button" :class="'tz-button--' + type" @click="emitClick()">
    <tz-icon v-if="loading" name="load-a"></tz-icon>
    <span><slot></slot></span>
  </button>
</template>

<script>
import TzIcon from '../icon'

export default {
  name: 'TzButton',

  components: {
    TzIcon
  },

  props: {
    type: {
      type: String,
      default: 'dafault'
    },

    loading: {
      type: Boolean,
      default: false
    },
  },

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>
