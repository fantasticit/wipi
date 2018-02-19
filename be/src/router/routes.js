import views from './view'
import routeConfig from './route-config'

const routes = [
  {
    path: '/',
    component: views.Home,
    children: [
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: views.Login
  },

  {
    path: '/register',
    name: 'Register',
    component: views.Register
  },

  {
    path: '/forbidden',
    name: 'Forbidden',
    component: views.Forbidden
  },

  {
    path: '*',
    name: 'NotFound',
    component: views.NotFound
  },
]

routeConfig.map(route => {
  if (!route.children) {
    routes[0].children.push(route)
  } else {
    route.children.map(subRoute => {
      subRoute.meta.prefix = route.prefix
      routes[0].children.push(subRoute)
    })
  }
})

routes[0].children.push(
  {
    path: 'article/:articleId',
    name: 'EditArticle',
    component: views.Article,
    meta: {
      prefix: '文章管理',
      title: '编辑文章',
    },
  },
)

export default routes
