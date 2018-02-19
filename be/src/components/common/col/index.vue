<template>
  <div :class="[
    'ta-col-' + span,
    offset > 0 ? 'ta-col-offset-' + offset: '',
    sm > 0 ? 'ta-col-sm-' + sm: '',
    md > 0 ? 'ta-col-md-' + md: '',
    lg > 0 ? 'ta-col-lg-' + lg: '',
  ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TaCol',
  props: ['span', 'sm', 'md', 'lg', 'offset']
}
</script>
