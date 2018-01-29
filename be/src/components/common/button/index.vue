<template>
  <button class="ta-button" :disabled="loading" :class="'ta-button--' + type" @click="emitClick()">
    <ta-icon v-if="loading" class="loading" name="load-a"></ta-icon>
    <ta-icon v-if="!loading && !!icon" :name="icon"></ta-icon>
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

    icon: {
      type: String,
      default: null
    }
  },

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>
