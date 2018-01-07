const router = require('koa-router')()
const UserController = require('../controller/user')

module.exports = (app) => {
  router.post('/user/register', UserController.register)

  app.use(router.routes())
    .use(router.allowedMethods())
}