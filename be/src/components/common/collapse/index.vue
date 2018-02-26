<template>
  <div class="ta-collapse" ref="collapse"
    :style="{ height: h + 'px' }">
    <div class="ta-collapse__header">
      <div>
        <slot name="title"></slot>
      </div>
      <ta-icon 
        name="ios-arrow-forward"
        v-show="!noIcon"
        :class="{ 'is-active': isShow }"
        @click="toggleShow()">
      </ta-icon>
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

  props: {
    noIcon: {
      type: Boolean,
      default: false
    }
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
        this.h = this.bodyHeight + 48 + 30
      } else {
        this.h = 48
      }
    },
  },
}
</script>
