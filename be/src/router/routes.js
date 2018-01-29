import views from './view'
import routeConfig from './route-config'

const routes = [
  {
    path: '/',
    component: views.Home,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: views.Login
      },
    ]
  }
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

export default routes
