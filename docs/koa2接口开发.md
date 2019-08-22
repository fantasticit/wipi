# 入门 koa2 接口开发

## 依赖安装

1. 安装`koa2`

2. 安装`koa-router`
   koa-router 提供了 .get、.post、.put 和 .del 接口来处理各种请求

## 代码分层

这里按照`MVC`的思想来组织代码结构：

```
server
├── app.js
├── controller
├── middleware
├── package.json
├── package-lock.json
└── router

```

- app.js: 程序入口
- middleware: koa2 相关中间件
- controller: 控制器
- router: koa-router 路由表

## 编码

1. 编写控制器
   当然还是经典的`hello world`。在 controller 文件下新建`index.js`，写入以下代码:

```
module.exports = {
  hello: async (ctx, next) => {
    ctx.response.body = 'Hello World'
  }
}
```

2. 编写中间件
   增加一个中间件来记录响应时间，在 middleware 文件下新建`index.js`，写入以下代码:

```
const logger = () =>  {
  return async (ctx, next) => {
    const start = Date.now()

    await next()

    const responseTime = (Date.now() - start)
    console.log(`响应时间为: ${responseTime / 1000}s`)
  }
}

module.exports = (app) => {
  app.use(logger())
}
```

注意，中间件只能是*函数*。

3. 编写路由表
   增加一个路由来试试，在 router 文件下新建`index.js`，写入以下代码:

```
const router = require('koa-router')()

module.exports = app => {
  router.get('/', Controller.hello) // 注意是在controller编写的hello函数

  app.use(router.routes()).use(router.allowedMethods())
}

```

4. 编写 app.js

```
const koa = require('koa')
const app = new koa()
const middleWare = require('./middleware')
const router = require('./router')

middleWare(app)
router(app)

app.listen(port, () => {
  console.log('server is running at http://localhost:3000')
})
```

5. 运行程序
   `node app.js`然后打开浏览器，访问`http://localhost:3000`就可以看到`Hello World`了。

## 总结

至此，使用`koa2`编写接口的基本思路就说完了，一般都是在`controller`对数据库进行`CRUD`，然后配置相关路由，就完成了一个接口服务的开发。
