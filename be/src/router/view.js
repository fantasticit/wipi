const views = {
  Login: () => import(/* webpackChunkName: "login" */'@/views/login'),
  Home: () => import(/* webpackChunkName: "home" */'@/views/home'),
  Dashboard: () => import(/* webpackChunkName: "dashboard" */'@/views/dashboard'),
  Article: () => import(/* webpackChunkName: "article" */'@/views/article'),
  ArticleList: () => import(/* webpackChunkName: "article-list" */'@/views/article-list'),
}

export default views
