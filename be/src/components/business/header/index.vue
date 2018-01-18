<template>
  <div class="ta-header">
    <div>
      <ta-icon
        class="ta-header__icon-menu" name="navicon"
        :class="{ 'is-rotate': isCollapse }"
        @click="emitMenu()"
      ></ta-icon>
      <span>首页 / 测试</span>
    </div>

    <div>
      <ta-icon :name="toggleScreenIcon" @click="toggleFullScreen()"></ta-icon>
      <div class="ta-header__avatar" @click="toggleShow">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        <transition name="slide-left">
          <ul v-if="showDropmenu" class="ta-header__avatar-dropmenu">
            <li>
                <router-link to="/dashboard">首页</router-link>
            </li>
            <li>
              <a href="http://github.com/mvpzx" target="_blank">项目地址</a>
            </li>
            <div class="cut-off"></div>
            <li>
              <router-link to="/login" replace>退出登录</router-link>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { on } from '@/util/event'
import TaIcon from '../../common/icon'
import Bus from '../bus'

export default {
  name: 'TaHeader',

  components: {
    TaIcon
  },

  mounted() {
    Bus.$on('expandMenu', () => this.isCollapse = false)
  },

  data() {
    return {
      showDropmenu: false,
      isCollapse: false,
      isFullScreen: false,
      toggleScreenIcon: 'arrow-expand',
    }
  },

  methods: {
    emitMenu() {
      this.isCollapse = !this.isCollapse
      this.$emit('toggleMenu')  
    },

    toggleShow() {
      this.showDropmenu = !this.showDropmenu

      // if (this.showDropmenu) {
      //   setTimeout(this.toggleShow, 3000)
      // }
    },

    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen

      if (this.isFullScreen) {
        fullScreen()
        this.toggleScreenIcon = 'arrow-shrink'
      } else {
        exitFullScreen()
        this.toggleScreenIcon = 'arrow-expand'
      }
    }
  },
}

// 全屏
function fullScreen() {
  const doc = document.documentElement
  if (doc.requestFullscreen) {
    doc.requestFullscreen()
  } else if (doc.mozRequestFullScreen) {
    doc.mozRequestFullScreen()
  } else if (doc.webkitRequestFullScreen) {
    doc.webkitRequestFullScreen()
  } else if (doc.msRequestFullScreen) {
    doc.msRequestFullScreen()
  }
}

// 退出全屏
function exitFullScreen() {
  const doc = document.documentElement
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msCancelFullScreen) {
    document.msCancelFullScreen()
  }
}
</script>
