<template>
  <div class="ta-header">
    <div>
      <ta-icon
        class="ta-header__icon-menu" name="navicon"
        :class="{ 'is-rotate': isCollapse }"
        @click="emitMenu()"
      ></ta-icon>
      <span v-for="(route, i) in routes" :key="i">
        <router-link v-if="routes.length > 1 && i == 0" :to="routes[0].path">{{ routes[0].title }}</router-link>
        <template v-if="route.prefix">{{ route.prefix }} /</template>
        <router-link v-if="i == routes.length - 1" :to="route.path" exact>{{ route.title }}</router-link>
        <template v-else-if="i !== 0 || routes.length <= 1">{{ route.title }}</template>
        <template v-if="routes.length > 1 && i < routes.length - 1">/</template>
      </span>
    </div>

    <div>
      <ta-icon :name="toggleScreenIcon" @click="toggleFullScreen()"></ta-icon>
      <div class="ta-header__avatar" @click="toggleDropMenu()">
        <p>{{ userInfo.account }}</p>
        <img :src="userInfo.avatar" alt="">
        <transition name="slide-down-dialog">
          <div 
            class="ta-header__avatar-dropmenu"
            v-if="showDropmenu">
            <ul>
              <li>
                <router-link to="/ownspace">个人中心</router-link>
              </li>
              <li>
                <a href="http://github.com/mvpzx/elapse" target="_blank">项目地址</a>
              </li>
              <div class="cut-off"></div>
              <li>
                <a href="javascript: void(0)" @click="logout()">退出登录</a> 
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import store from '@/store'
import { mapState } from 'vuex'
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

  computed: {
    ...mapState('route', {
      routes: state => state.routes
    }),

    userInfo() {
      return JSON.parse(window.sessionStorage.getItem('userInfo'))
    },
  },

  methods: {
    emitMenu() {
      this.isCollapse = !this.isCollapse
      this.$emit('toggleMenu')  
    },

    toggleDropMenu() {
      this.showDropmenu = !this.showDropmenu
    },

    show() {
      this.showDropmenu = true
    },

    hide() {
      this.showDropmenu = false
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
    },

    logout() {
      store.dispatch('logout')
        .then(() => router.replace('/login'))
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
