const views = {
  Login: () => import(/* webpackChunkName: "login" */'@/views/login'),
  Home: () => import(/* webpackChunkName: "home" */'@/views/home'),
  Dashboard: () => import(/* webpackChunkName: "dashboard" */'@/views/dashboard'),
  Article: () => import(/* webpackChunkName: "article" */'@/views/article'),
  ArticleList: () => import(/* webpackChunkName: "article-list" */'@/views/article-list'),
  FePerformence: () => import(/* webpackChunkName: "fe-performence" */'@/views/performence-fe'),
  ApiPerformence: () => import(/* webpackChunkName: "api-performence" */'@/views/performence-api'),
  ApiLogger: () => import(/* webpackChunkName: "api-logger" */'@/views/logger-api'),
  FeLogger: () => import(/* webpackChunkName: "fe-logger" */'@/views/logger-fe'),
  Ownspace: () => import(/* webpackChunkName: "ownspace" */'@/views/ownspace'),
  UserManagement: () => import(/* webpackChunkName: "user-management" */'@/views/user-management'),
  Forbidden: () => import(/* webpackChunkName: "forbidden" */'@/views/forbidden'),
  NotFound: () => import(/* webpackChunkName: "not-found" */'@/views/not-found'),
}

export default views
