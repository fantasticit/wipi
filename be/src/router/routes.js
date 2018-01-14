import views from './view'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: views.Login
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: views.Dashboard
  },
]

export default routes