const cors = require('koa2-cors')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const json = require('./json')

module.exports = (app) => {
  app.use(logger())
  app.use(cors())
  app.use(bodyParser())
  app.use(json())
}
