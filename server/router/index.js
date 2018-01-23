const router = require('koa-router')()
const UserController = require('../controller/user')
const ArticleController = require('../controller/article')

module.exports = (app) => {
  router.post('/user/register', UserController.register)
  router.post('/user/login', UserController.login)

  router.get('/article', ArticleController.get)
  router.post('/article/new', ArticleController.add)

  app.use(router.routes())
    .use(router.allowedMethods())
}
