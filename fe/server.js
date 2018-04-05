const Koa = require('koa')
const next = require('next')
const KoaRouter = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new KoaRouter()

  // give all Nextjs's request to Nextjs before anything else
  router.get('/_next/*', async ctx => {
    await handle(ctx.req, ctx.res);
  })

  router.get('/static/*', async ctx => {
    await handle(ctx.req, ctx.res);
  })

  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/post', ctx.query)
    ctx.respond = false
  })

  router.get('/post', async ctx => {
    await app.render(ctx.req, ctx.res, '/post', ctx.query)
    ctx.respond = false
  })

  router.get('/post/tag/:tag', async ctx => {
    await app.render(ctx.req, ctx.res, '/post', ctx.params)
    ctx.respond = false
  })

  router.get('/post/classify/:classify', async ctx => {
    await app.render(ctx.req, ctx.res, '/post', ctx.params)
    ctx.respond = false
  })


  router.get('/article/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/article', ctx.params)
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, err => {
    if (err) {
      throw err
    }
    console.log(`服务运行在：http://localhost:${port}`)
  })
})
