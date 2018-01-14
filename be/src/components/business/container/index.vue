<template>
  <div class="fa-container" :class="{ 'is-fullscreen': isCollapse }">
    <nav class="fa-container__aside" :class="{ 'is-collapse': isCollapse }">
      <fa-navmenu
        :class="{ 'is-collapse': isCollapse }"
        @show="toggleMenu()"
      ></fa-navmenu>
    </nav>
    <div class="fa-container__content">
      <header>
        <fa-header @toggleMenu="toggleMenu()"></fa-header>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import FaNavmenu from '../nav-menu'
import FaHeader from '../header'

export default {
  name: 'FaContainer',

  components: {
    FaNavmenu,
    FaHeader,
  },

  data() {
    return {
      isCollapse: false,
    }
  },

  methods: {
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>
