<template>
  <transition name="fade-out">
    <div class="ta-loading" v-if="isShow">
      <div>
        <ta-icon class="loading" name="load-c"></ta-icon>
        <p>{{ tip }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import TaIcon from '../../icon'

export default {
  name: 'TaLoading',

  components: {
    TaIcon
  },

  props: {
    tip: {
      type: String,
      default: '正在加载中...'
    },
  },

  data() {
    return {
      isShow: false,
    }
  },

  methods: {
    close() {
      this.isShow = false
    },

    show() {
      this.isShow = true
    }
  },
}
</script>
