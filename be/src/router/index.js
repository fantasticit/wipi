import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Loadingbar } from '@/components/common/loadingbar'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },

    ...routes
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = '管理后台'
  next()
})

// 面包屑设置
router.beforeEach((to, from, next) => {
  if (to.meta) {
    const route = {
      title: to.meta.title,
      path: to.path,
    }
  
    if (to.meta.prefix) {
      route.prefix = to.meta.prefix
    }
  
    store.dispatch('route/setRoute', route)
      .then(_ => next())
  } else {
    next()
  }
})

// loading-bar
router.beforeEach((to, from, next) => {
  Loadingbar.start()
  next()
})

router.afterEach((to, from) => {
  Loadingbar.finish()
})

export default router