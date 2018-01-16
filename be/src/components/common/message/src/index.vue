<template>
  <transition name="slide-down">
    <div 
      v-if="isShow"
      class="tz-message" :class="'tz-message--' + type">
      <tz-icon :name="iconName"></tz-icon>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import TzIcon from '../../icon'

export default {
  name: 'TzMessage',

  components: {
    TzIcon
  },

  data(){
    return {
      type: '',
      isShow: false,
      message: '',
    }
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

  methods: {
    show() {
      this.isShow = true
    },

    close() {
      this.isShow = false
    }
  },
}
</script>
