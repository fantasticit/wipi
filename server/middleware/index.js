const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const json = require('./json')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser())
  app.use(json())
}