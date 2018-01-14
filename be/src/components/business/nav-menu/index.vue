<template>
  <div class="fa-navmenu">
    <ul>
      <li> 
        <router-link to="/dashboard" exact>
          <fa-icon name="ios-speedometer"></fa-icon>
          <span>首页</span>
        </router-link>
      </li>

      <li :class="{'is-active': isShowSubmenu}">
        <p @click="toggleShow()">
          <fa-icon name="ios-speedometer"></fa-icon>
          <span>测试1</span>
          <fa-icon
            class="fa-icon__arrow"
            :class="{'is-active': isShowSubmenu}"
            name="ios-arrow-down"></fa-icon>
        </p>
        <ul class="fa-navmenu__submenu">
          <li> 
            <router-link to="/1">
              <span>测试1-1</span>
            </router-link>
          </li>

          <li> 
            <router-link to="/2">
              <span>测试1-2</span>
            </router-link>
          </li>

          <li> 
            <router-link to="/3">
              <span>测试1-3</span>
            </router-link>
          </li>

          <li> 
            <router-link to="/4">
              <span>测试1-4</span>
            </router-link>
          </li>
        </ul>
      </li>


      <li> 
        <router-link to="/" exact>
          <fa-icon name="ios-speedometer"></fa-icon>
          <span>测试2</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import FaIcon from '../../common/icon'

export default {
  name: 'FaNavmenu',

  components: {
    FaIcon
  },

  data() {
    return {
      isShowSubmenu: false
    }
  },

  methods: {
    toggleShow() {
      this.isShowSubmenu = !this.isShowSubmenu
    }
  }
}
</script>
