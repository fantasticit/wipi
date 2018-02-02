const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const httpErrorHandler = require('./http-error')
const json = require('./json')
const logger = require('./logger')

module.exports = (app) => {
  app.use(cors())
  app.use(httpErrorHandler())
  app.use(logger())
  app.use(bodyParser())
  app.use(json())
}
