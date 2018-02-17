const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const httpErrorHandler = require('./http-error')
const json = require('./json')
const logger = require('./logger')
const koaJwt = require('koa-jwt')
const secret = require('../config').secret

module.exports = (app) => {
  app.use(logger())
  app.use(cors())
  app.use(httpErrorHandler())
  app.use(koaJwt({secret}).unless({path: [/^\/user\/login/, /^\/performence/]}))
  app.use(bodyParser())
  app.use(json())
}
