import Vue from 'vue'
import Router from 'vue-router'
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
  window.document.title = '码心管理后台'
  next()
})

export default router