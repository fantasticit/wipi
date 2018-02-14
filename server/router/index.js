const router = require('koa-router')()
const article = require('./routes/article')
const qiniu = require('./routes/qiniu')
const user = require('./routes/user')
const fePerformence = require('./routes/fePerformence')

module.exports = app => {
  article(router)
  qiniu(router)
  user(router)
  fePerformence(router)

  app.use(router.routes())
    .use(router.allowedMethods())
}
