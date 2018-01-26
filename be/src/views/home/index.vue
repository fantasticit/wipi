<template>
  <ta-container>
    <router-view></router-view>
  </ta-container>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component()
export default class Home extends Vue {
}
</script>
