<template>
  <div class="fa-navmenu">
    <ul>
      <li @click="emitShow($event)"> 
        <router-link to="/dashboard" exact>
          <fa-icon name="ios-speedometer"></fa-icon>
          <span>首页</span>
        </router-link>
      </li>

      <li :class="{'is-active': isShowSubmenu}" @click="emitShow($event)">
        <p @click="toggleShow()">
          <fa-icon name="ios-speedometer"></fa-icon>
          <span>测试1</span>
          <fa-icon
            class="fa-icon__arrow"
            :class="{'is-active': isShowSubmenu}"
            name="ios-arrow-down">
          </fa-icon>
        </p>
        <ul class="fa-navmenu__submenu">
          <li> 
            <router-link to="/1">
              <span>测试1-1</span>
            </router-link>
          </li>
          <li> 
            <router-link to="/1">
              <span>测试1-1</span>
            </router-link>
          </li>
          <li> 
            <router-link to="/1">
              <span>测试1-1</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { hasClassName } from '@/util/class-name'
import FaIcon from '../../common/icon'
import Bus from '../bus'

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
    },

    emitShow(e) {
      const target = e.target || e.srcElement
      let node = target.parentNode.parentNode.parentNode
      if (!hasClassName(node, 'fa-navmenu')) {
        node = node.parentNode
      }
      if (hasClassName(node, 'is-collapse')) {
        this.$emit('show')
        Bus.$emit('expandMenu')
      }
    }
  }
}
</script>
