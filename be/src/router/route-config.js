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
]

export default routeConfig
