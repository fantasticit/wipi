const cors = require('koa2-cors')
const json = require('./json')
const logger = require('./logger')
const koaJwt = require('koa-jwt')
const secret = require('../config').secret
const gzip = require('./gzip')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./error-handler')

module.exports = (app) => {
  app.use(errorHandler())
  app.use(logger())
  app.use(gzip())
  app.use(cors())
  app.use(koaJwt({secret}).unless({path: [/^\/user/, /^\/performence/, /^\/article/]}))
  app.use(bodyParser())
  app.use(json())
}
