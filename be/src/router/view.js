const views = {
  Login: () => import(/* webpackChunkName: "login" */'@/views/login'),
  Dashboard: () => import(/* webpackChunkName: "dashboard" */'@/views/dashboard'),
  Article: () => import(/* webpackChunkName: "dashboard" */'@/views/article'),
  ArticleList: () => import(/* webpackChunkName: "dashboard" */'@/views/article-list'),
}

export default views