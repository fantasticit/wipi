<template>
  <div class="fa-container">
    <nav class="fa-container__aside">
      <fa-navmenu></fa-navmenu>
    </nav>
    <div class="fa-container__content">
      <header>header</header>
      <main>main</main>
    </div>
  </div>
</template>

<script>
import FaNavmenu from '../nav-menu'

export default {
  name: 'FaContainer',

  components: {
    FaNavmenu,
  },
}
</script>
