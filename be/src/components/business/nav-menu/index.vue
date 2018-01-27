<template>
  <div class="ta-navmenu">
    <ul>
      <li>
        <div>
          <router-link to="/dashboard" exact>
            <span>首页</span>
          </router-link>
          <ta-icon name="ios-speedometer"></ta-icon>
        </div>
      </li>

      <li :class="{'is-active': isShowSubmenu[0]}">
        <div @click="toggleShow(0)">
          <ta-icon
            class="ta-icon__arrow"
            :class="{'is-active': isShowSubmenu[0]}"
            name="ios-arrow-down">
          </ta-icon>
          <span>文章管理</span>
          <ta-icon name="ios-speedometer"></ta-icon>
        </div>
        <ul class="ta-navmenu__submenu">
          <li> 
            <div>
              <router-link to="/article">
                <span>文章列表</span>
              </router-link>
            </div>
          </li>
          <li> 
            <div>
              <router-link to="/article/new">
                <span>新建文章</span>
              </router-link>
            </div>
          </li>
        </ul>
      </li>
<!-- 
      <li :class="{'is-active': isShowSubmenu[1]}">
        <div @click="toggleShow(1)">
          <ta-icon
            class="ta-icon__arrow"
            :class="{'is-active': isShowSubmenu[1]}"
            name="ios-arrow-down">
          </ta-icon>
          <span>文章管理</span>
          <ta-icon name="ios-speedometer"></ta-icon>
        </div>
        <ul class="ta-navmenu__submenu">
          <li> 
            <div>
              <router-link to="/article">
                <span>文章列表</span>
              </router-link>
            </div>
          </li>
          <li> 
            <div>
              <router-link to="/article/new">
                <span>新建文章</span>
              </router-link>
            </div>
          </li>
        </ul>
      </li> -->
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
      isShowSubmenu: [false, false]
    }
  },

  methods: {
    toggleShow(i) {
      if (this.isShowSubmenu[i]) {
        this.$set(this.isShowSubmenu, i, false)
      } else {
        this.$set(this.isShowSubmenu, i, true)
      }
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
