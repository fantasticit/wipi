<template>
  <div class="ta-container" :class="{ 'is-fullscreen': isCollapse }">
    <nav class="ta-container__aside" :class="{ 'is-collapse': isCollapse }">
      <ta-navmenu
        :class="{ 'is-collapse': isCollapse }"
        @show="toggleMenu()"
      ></ta-navmenu>
    </nav>
    <div class="ta-container__content">
      <header>
        <ta-header @toggleMenu="toggleMenu()"></ta-header>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import TaNavmenu from '../nav-menu'
import TaHeader from '../header'

export default {
  name: 'TaContainer',

  components: {
    TaNavmenu,
    TaHeader,
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
