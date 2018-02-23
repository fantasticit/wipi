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


























// Todo: 前台设置
//        1. SEO信息（基本信息）
//        2. 统计代码
//        3. 页面分类（即文章分类）

// Todo: 标签管理
// Todo: 文章审核
