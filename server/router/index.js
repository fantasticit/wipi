const router = require('koa-router')()
const article = require('./routes/article')
const qiniu = require('./routes/qiniu')
const user = require('./routes/user')

module.exports = app => {
  article(router)
  qiniu(router)
  user(router)

  app.use(router.routes())
    .use(router.allowedMethods())
}
