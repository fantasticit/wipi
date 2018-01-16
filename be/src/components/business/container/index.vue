<template>
  <div class="tz-container" :class="{ 'is-fullscreen': isCollapse }">
    <nav class="tz-container__aside" :class="{ 'is-collapse': isCollapse }">
      <tz-navmenu
        :class="{ 'is-collapse': isCollapse }"
        @show="toggleMenu()"
      ></tz-navmenu>
    </nav>
    <div class="tz-container__content">
      <header>
        <tz-header @toggleMenu="toggleMenu()"></tz-header>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import TzNavmenu from '../nav-menu'
import TzHeader from '../header'

export default {
  name: 'TzContainer',

  components: {
    TzNavmenu,
    TzHeader,
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
