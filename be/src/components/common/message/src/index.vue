<template>
  <transition name="slide-down">
    <div 
      v-if="isShow"
      class="ta-message" :class="'ta-message--' + type">
      <ta-icon :name="iconName"></ta-icon>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import TaIcon from '../../icon'

export default {
  name: 'TaMessage',

  components: {
    TaIcon
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
