const bodyParser = require('koa-bodyparser')
const miSend = require('./mi-send')

module.exports = (app) => {
  app.use(bodyParser())
  app.use(miSend())
}