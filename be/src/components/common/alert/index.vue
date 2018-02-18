<template>
  <transition name="fade-out">
    <div 
      class="ta-alert" :class="'ta-alert--' + type"
      v-if="visible">
      <ta-icon v-if="!showIcon" :name="iconName"></ta-icon>
      <div class="ta-alert__content">
        <slot></slot>
        <ta-icon name="ios-close-empty" @click="close"></ta-icon>
      </div>
    </div>
  </transition>
</template>

<script>
import TaIcon from '../icon'

export default {
  name: 'TaAlert',

  components: {
    TaIcon
  },

  props: {
    type: {
      type: String,
      default: 'info'
    },

    icon: {
      type: String,
      default: null
    },

    showIcon: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    iconName() {
      switch (this.type) {
        case 'success':
          return 'checkmark-circled'
        
        case 'error':
          return 'close-circled'
        
        default:
          return 'information-circled'
      }
    }
  },

  data() {
    return {
      visible: true
    }
  },

  methods: {
    close() {
      this.visible = false
    }
  },
}
</script>
