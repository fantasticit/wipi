<template>
  <div class="ta-navmenu">
    <ul>
      <li @click="emitShow($event)"> 
        <router-link to="/dashboard" exact>
          <ta-icon name="ios-speedometer"></ta-icon>
          <span>首页</span>
        </router-link>
      </li>

      <li :class="{'is-active': isShowSubmenu}" @click="emitShow($event)">
        <p @click="toggleShow()">
          <ta-icon name="ios-speedometer"></ta-icon>
          <span>文章管理</span>
          <ta-icon
            class="ta-icon__arrow"
            :class="{'is-active': isShowSubmenu}"
            name="ios-arrow-down">
          </ta-icon>
        </p>
        <ul class="ta-navmenu__submenu">
          <li> 
            <router-link to="/article">
              <span>文章列表</span>
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
import TaIcon from '../../common/icon'
import Bus from '../bus'

export default {
  name: 'TaNavmenu',

  components: {
    TaIcon
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
      if (!hasClassName(node, 'ta-navmenu')) {
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
