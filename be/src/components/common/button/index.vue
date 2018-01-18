<template>
  <button class="ta-button" :class="'ta-button--' + type" @click="emitClick()">
    <ta-icon v-if="loading" name="load-a"></ta-icon>
    <span><slot></slot></span>
  </button>
</template>

<script>
import TaIcon from '../icon'

export default {
  name: 'TaButton',

  components: {
    TaIcon
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
