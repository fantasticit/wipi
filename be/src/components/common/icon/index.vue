<template>
  <i class="fa-icon" :class="'ion-' + name"></i>
</template>

<script>
export default {
  name: 'FaIcon',

  props: ['name']
}
</script>

