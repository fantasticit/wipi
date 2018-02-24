const isJSON = require('koa-is-json')
const zlib = require('zlib')

module.exports = () => {
  return async (ctx, next) => {
    // 后续中间件执行完成后将响应体转换成 gzip
    await next()
    
    let body = ctx.body
    if (!body) return

    const acceptEncoding = ctx.request.headers['accept-encoding']

    if (
      acceptEncoding 
      && acceptEncoding.indexOf('gzip') > -1
    ) {
      if (isJSON(body)) body = JSON.stringify(body)
      // gzip body并设置 gzip 响应头
      ctx.set('Content-Encoding', 'gzip')
      ctx.body = zlib.gzipSync(body)
    } else {
      return
    }
  }
}
