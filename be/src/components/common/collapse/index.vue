<template>
  <div class="ta-collapse" ref="collapse"
    :style="{ height: h + 'px' }">
    <div class="ta-collapse__header" 
      @click="toggleShow()">
      <span>title</span>
      <span>
        <ta-icon 
          name="ios-arrow-forward"
          :class="{ 'is-active': isShow }">
        </ta-icon>
      </span>
    </div>
    <div class="ta-collapse__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TaIcon from '../icon'

export default {
  name: 'TaCollapse',

  components: {
    TaIcon,
  },

  data() {
    return {
      isShow: false,
      bodyHeight: 0,
      h: 48,
    }
  },

  mounted() {
    const body = this.$refs['collapse'].querySelector('.ta-collapse__body')
    this.bodyHeight = body.offsetHeight
  },

  methods: {
    toggleShow() {
      this.isShow = !this.isShow

      if (this.isShow) {
        this.h = this.bodyHeight + 48
      } else {
        this.h = 48
      }
    },
  },
}
</script>
