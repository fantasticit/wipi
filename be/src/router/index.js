import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Loadingbar } from '@/components/common/loadingbar'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },

    ...routes,
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = '管理后台'
  next()
})

// 登录拦截
router.beforeEach((to, from, next) => {
  const hasLogined = JSON.parse(window.sessionStorage.getItem('hasLogined'))

  if (!hasLogined && to.path !== '/login' && to.path !== '/register') {
    next({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  } else {
    next()
  }
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



// server {
//   listen 80 default_server;
//   listen [::]:80 default_server;

//   root /your/root/path;

//   index index.html;

//   server_name you.server.com;

//   location / {
//     try_files $uri $uri/ @rewrites;
//   }

//   location @rewrites {
//     rewrite ^(.+)$ /index.html last;
//   }

//   location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
//     # Some basic cache-control for static files to be sent to the browser
//     expires max;
//     add_header Pragma public;
//     add_header Cache-Control "public, must-revalidate, proxy-revalidate";
//   }

// }
