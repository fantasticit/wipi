const router = require('koa-router')()
const article = require('./routes/article')
const qiniu = require('./routes/qiniu')
const user = require('./routes/user')
const performence = require('./routes/performence')
const errorHandler = require('./routes/error')

module.exports = app => {
  article(router)
  qiniu(router)
  user(router)
  performence(router)
  errorHandler(router)

  app.use(router.routes())
    .use(router.allowedMethods())
}
