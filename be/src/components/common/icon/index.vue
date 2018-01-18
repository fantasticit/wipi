<template>
  <i class="ta-icon" :class="'ion-' + name" @click="emitClick()"></i>
</template>

<script>
export default {
  name: 'TaIcon',

  props: ['name'],

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>

