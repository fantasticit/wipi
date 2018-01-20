<template>
  <transition name="rotate-out">
    <span class="ta-tag" :class="'ta-tag--' + type" v-if="isShow">
      <slot></slot>
      <ta-icon v-if="closeable" name="ios-close-empty" @click="close()"></ta-icon>
    </span>
  </transition>
</template>

<script>
import TaIcon from '../icon'

export default {
  name: 'TaTag',

  components: {
    TaIcon,
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },

    closeable: {
      type: Boolean,
      default: true
    },
  },

  data() {
    return {
      isShow: true
    }
  },

  methods: {
    close() {
      this.isShow = false
      this.$emit('close')
    }
  }
}
</script>
