import views from './view'

const routeConfig = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: views.Dashboard,
    icon: 'ios-speedometer',
    meta: {
      title: '首页',
    }
  },

  {
    prefix: '文章管理',
    icon: 'ios-paper',
    children: [
      {
        path: 'article',
        name: 'ArticleList',
        component: views.ArticleList,
        meta: {
          title: '文章列表',
        },
      },
    
      {
        path: 'article/new',
        name: 'NewArticle',
        component: views.Article,
        meta: {
          title: '新建文章',
        },
      },
    ],
  },

  {
    prefix: '性能分析',
    icon: 'compass',
    children: [
      {
        path: 'performence/fe',
        name: 'FePerformence',
        component: views.FePerformence,
        meta: {
          title: '前端性能',
        },
      },
    
      {
        path: 'performence/api',
        name: ' ApiPerformence',
        component: views.ApiPerformence,
        meta: {
          title: '接口性能',
        },
      },
    ],
  },

  {
    prefix: '错误日志',
    icon: 'bug',
    children: [
      {
        path: 'article',
        name: 'ArticleList',
        component: views.ArticleList,
        meta: {
          title: '前端日志',
        },
      },
    
      {
        path: 'article/new',
        name: 'NewArticle',
        component: views.Article,
        meta: {
          title: '接口日志',
        },
      },
    ],
  },
]

export default routeConfig
