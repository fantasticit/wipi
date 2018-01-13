import Vue from 'vue'
import Router from 'vue-router'
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

router.beforeEach((to, from, next) => {
  Loadingbar.start()
  next()
})

router.afterEach((to, from) => {
  console.log(5)
  Loadingbar.finish()
})

export default router