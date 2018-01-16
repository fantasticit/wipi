<template>
  <div class="tz-navmenu">
    <ul>
      <li @click="emitShow($event)"> 
        <router-link to="/dashboard" exact>
          <tz-icon name="ios-speedometer"></tz-icon>
          <span>首页</span>
        </router-link>
      </li>

      <li :class="{'is-active': isShowSubmenu}" @click="emitShow($event)">
        <p @click="toggleShow()">
          <tz-icon name="ios-speedometer"></tz-icon>
          <span>文章管理</span>
          <tz-icon
            class="tz-icon__arrow"
            :class="{'is-active': isShowSubmenu}"
            name="ios-arrow-down">
          </tz-icon>
        </p>
        <ul class="tz-navmenu__submenu">
          <li> 
            <router-link to="/1">
              <span>已发文章</span>
            </router-link>
          </li>
          <li> 
            <router-link to="/article/new">
              <span>新建文章</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { hasClassName } from '@/util/class-name'
import TzIcon from '../../common/icon'
import Bus from '../bus'

export default {
  name: 'TzNavmenu',

  components: {
    TzIcon
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
      if (!hasClassName(node, 'tz-navmenu')) {
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
