<template>
  <button class="fa-button" :class="'fa-button--' + type" @click="emitClick()">
    <fa-icon v-if="loading" name="load-a"></fa-icon>
    <span><slot></slot></span>
  </button>
</template>

<script>
import FaIcon from '../icon'

export default {
  name: 'FaButton',

  components: {
    FaIcon
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
