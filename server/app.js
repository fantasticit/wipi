const koa = require('koa')
const app = new koa()
const db = require('./mongodb/db')
const middleWare = require('./middleware')
const router = require('./router')

middleWare(app)
router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})