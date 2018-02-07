<template>
  <ta-container>
    <!-- <transition name="slide-up"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </ta-container>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component()
export default class Home extends Vue {
}
</script>
