<template>
  <button class="fa-button" :class="'fa-button--' + type">
    <fa-icon v-if="loading" name="load-a"></fa-icon>
    <span><slot></slot></span>
  </button>
</template>

<script>
import FaIcon from '../icon'

export default {
  name: 'FaButton',

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

  components: {
    FaIcon
  },
}
</script>
