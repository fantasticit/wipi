const koa = require('koa')
const app = new koa()
const port = require('./config').port
const db = require('./mongodb/db')
const middleWare = require('./middleware')
const router = require('./router')

middleWare(app)
router(app)

app.listen(port, () => {
  console.log('server is running at http://localhost:', port)
})
