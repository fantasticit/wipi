const views = {
  Login: () => import(/* webpackChunkName: "login" */'@/views/login'),
  Dashboard: () => import(/* webpackChunkName: "dashboard" */'@/views/dashboard'),
}

export default views