const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const json = require('./json')
const logger = require('./logger')

module.exports = (app) => {
  app.use(cors())
  app.use(logger())
  app.use(bodyParser())
  app.use(json())
}
