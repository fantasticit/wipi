<template>
  <div class="fa-header">
    <div>
      <fa-icon
        class="fa-header__icon-menu" name="navicon"
        :class="{ 'is-rotate': isCollapse }"
        @click="emitMenu()"
      ></fa-icon>
      <span>首页 / 测试</span>
    </div>

    <div>
      <fa-icon :name="toggleScreenIcon" @click="toggleFullScreen()"></fa-icon>
      <div class="fa-header__avatar" @click="toggleShow">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        <transition name="slide-left">
          <ul v-if="showDropmenu" class="fa-header__avatar-dropmenu">
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
import FaIcon from '../../common/icon'

export default {
  name: 'FaHeader',

  components: {
    FaIcon
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

      if (this.showDropmenu) {
        setTimeout(this.toggleShow, 3000)
      }
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
