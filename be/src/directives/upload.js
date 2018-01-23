import Vue from 'vue'

Vue.directive('upload', (el, binding) => {
  const input = el.querySelector('input')
  console.log(input)
})