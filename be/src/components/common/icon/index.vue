<template>
  <i class="tz-icon" :class="'ion-' + name" @click="emitClick()"></i>
</template>

<script>
export default {
  name: 'TzIcon',

  props: ['name'],

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>

