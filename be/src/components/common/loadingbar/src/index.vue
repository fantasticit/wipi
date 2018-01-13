<template>
  <div
    v-if="isShow"
    class="fa-loadingbar"
    :style="{ 'width': w + 'vh' }"
  >
  </div>
</template>

<script>
export default {
  name: 'FaLoadingbar',

  data() {
    return {
      w: 0,
      isShow: false,
    }
  },

  methods: {
    start() {
      this.isShow = true
      setInterval(() => {
        if (this.w < 99) {
          this.w++
        }
      }, 10)
    },

    finish() {
      (() => {
        return new Promise(resolve => {
          const timer = setInterval(() => {
            if (this.w >= 100) {
              clearInterval(timer)
              resolve()
            }
            this.w++
          }, 10)
        })
      })()
        .then(() => setTimeout(() => this.isShow = false, 100))
    },
  },
}
</script>
