const router = require('koa-router')()
// const UserController = require('../controller/user')
// const ArticleController = require('../controller/article')
// const QiniuController = require('../controller/qiniu')
const article = require('./routes/article')
const qiniu = require('./routes/qiniu')
const user = require('./routes/user')

module.exports = app => {
  // router.post('/user/register', UserController.register)
  // router.post('/user/login', UserController.login)
  // router.get('/article', ArticleController.get)
  // router.post('/article/new', ArticleController.add)
  // router.get('/qiniu/token', QiniuController.getQiniuToken)

  article(router)
  qiniu(router)
  user(router)

  app.use(router.routes())
    .use(router.allowedMethods())
}
