<template>
  <transition name="slide-down">
    <div 
      v-if="isShow"
      class="fa-message" :class="'fa-message--' + type">
      <fa-icon :name="iconName"></fa-icon>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import FaIcon from '../../icon'

export default {
  name: 'FaMessage',

  components: {
    FaIcon
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
