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
    icon: 'person',
    path: 'ownspace',
    name: 'Ownspace',
    component: views.Ownspace,
    meta: {
      title: '个人中心',
    },
  },

  {
    icon: 'person-stalker',
    path: 'user-managemt',
    name: 'UserManagement',
    component: views.UserManagement,
    meta: {
      title: '用户管理',
    },
  },

  {
    prefix: '文章管理',
    icon: 'ios-book',
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
    prefix: '分类管理',
    icon: 'ios-paper',
    children: [
      {
        path: 'classify',
        name: 'ClassifyList',
        component: views.ClassifyList,
        meta: {
          title: '分类列表',
        },
      },
    
      {
        path: 'classify/new',
        name: 'NewClasify',
        component: views.Classify,
        meta: {
          title: '添加分类',
        },
      },
    ],
  },

  {
    prefix: '标签管理',
    icon: 'ios-pricetags',
    children: [
      {
        path: 'tag',
        name: 'TagList',
        component: views.TagList,
        meta: {
          title: '标签列表',
        },
      },
    
      {
        path: 'tag/new',
        name: 'Newtag',
        component: views.Tag,
        meta: {
          title: '添加标签',
        },
      },
    ],
  },

  // {
  //   prefix: '性能分析',
  //   icon: 'compass',
  //   children: [
  //     {
  //       path: 'performence/fe',
  //       name: 'FePerformence',
  //       component: views.FePerformence,
  //       meta: {
  //         title: '前端性能',
  //       },
  //     },
    
  //     {
  //       path: 'performence/api',
  //       name: ' ApiPerformence',
  //       component: views.ApiPerformence,
  //       meta: {
  //         title: '接口性能',
  //       },
  //     },
  //   ],
  // },

  // {
  //   prefix: '错误日志',
  //   icon: 'bug',
  //   children: [
  //     {
  //       path: 'log/fe',
  //       name: 'FeLogger',
  //       component: views.FeLogger,
  //       meta: {
  //         title: '前端日志',
  //       },
  //     },
    
  //     {
  //       path: 'log/api',
  //       name: 'ApiLog',
  //       component: views.ApiLogger,
  //       meta: {
  //         title: '接口日志',
  //       },
  //     },
  //   ],
  // },

  {
    icon: 'cube',
    path: 'components',
    name: 'Components',
    component: views.Components,
    meta: {
      title: '组件一览',
    },
  },
]

export default routeConfig
