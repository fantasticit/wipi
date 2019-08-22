# token 签发与认证

`elapse-server`项目使用`jsonwebtoken`来生成 token，使用`koa-jwt`认证 token。

## 生成 token

生成 token 一般是用户登录接口，所哟我在用户登录接口的 controller 添加了如下代码：

```
const jwt = require('jsonwebtoken')
const token = jwt.sign({ account, roles: res.roles }, secret, { expiresIn: '1h' })
ctx.send({ message: `登录成功`, data: token })
```

这样便完成了 token 的签发。

## 验证 token

`elapse-server`使用的是 koa2，故使用`koa-jwt`这个中间件进行 token 验证，代码如下：

```
const koaJwt = require('koa-jwt')
app.use(koaJwt({secret}).unless({path: [/^\/user\/login/]}))
```

注意，`unless`指明了`/user/login`不需要验证 token（不然没法登录了）。
那么，接下来还需要添加一个错误处理中间件来处理 token 验证不通过以告知前端，代码如下：

```
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const statusCode = err.statusCode || err.status || 500
    const errMsg = err.message || '服务器错误'
    ctx.response.status = statusCode

    if (statusCode === 401) {
      ctx.response.body = { status: 'no', message: `token不存在或已过期` }
    } else  {
      ctx.response.body = { errMsg }
    }
  }
})

```

## 前端请求的正确姿势

至此，`elapse-server`便启动了部分接口的`token`验证，那么相应地前端 ajax 请求也应加上 token 了。
我使用的是`axios`这个库，代码如下：

```
axios.interceptors.request.use(
  config => {
    const token = JSON.parse(window.sessionStorage.getItem('token'))

    if (
      config.url !== '/user/loin'
      || config.url !== '/user/register'
    ) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  err => {
    throw new Error('发起请求出错')
  }
)
```

至此，token 签发与验证结束。
