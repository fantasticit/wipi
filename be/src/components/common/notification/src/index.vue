<template>
  <transition name="slide-left">
    <div class="ta-notification" v-if="show">
      <ta-icon class="btn-close" name="close-round" @click="close()">
      </ta-icon>
      <ta-icon :name="icon" :class="'is-' + type"></ta-icon>
      <div>
        <h2 class="title">{{ title }}</h2>
        <p>{{ msg }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import TaIcon from '../../icon'

export default {
  name: 'TaNotification',

  components: {
    TaIcon,
  },

  data()  {
    return {
      type: '',
      title: '',
      msg: '',
      show: false,
    }
  },

  computed: {
    icon() {
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
    close() {
      this.show = false;
    }
  }
}
</script>
