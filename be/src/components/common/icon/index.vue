<template>
  <i class="fa-icon" :class="'ion-' + name" @click="emitClick()"></i>
</template>

<script>
export default {
  name: 'FaIcon',

  props: ['name'],

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>

