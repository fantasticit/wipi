<template>
  <transition name="slide-fade">
    <div class="notification" v-if="show">
      <i class="fa fa-times btn-close" aria-hidden="true" @click="close()"></i>
      <div>
        <i class="fa fa-info-circle"  aria-hidden="true" v-if="type === 'info'"></i>
        <i class="fa fa-check-circle" aria-hidden="true" v-if="type === 'success'"></i>
        <i class="fa fa-times-circle" aria-hidden="true" v-if="type === 'fail'"></i>
      </div>
      <div>
        <h2 class="title">{{ title }}</h2>
        <p>{{ msg }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TaNotification',
  data()  {
    return {
      type: '',
      title: '',
      msg: '',

      show: true,
    }
  },

  methods: {
    close() {
      this.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import './main.scss'
</style>
