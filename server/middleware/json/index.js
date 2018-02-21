const zlib = require('zlib')

/**
 * Json中间件
 * how to use:
 * ctx.send({
 *  status: 'success',
 *  data: data
 * })
 */
module.exports = () => {
  function render(jsonData) {
    this.set('Content-Type', 'application/json')
    const acceptEncoding = this.request.headers['accept-encoding']

    if (acceptEncoding && acceptEncoding.indexOf('gzip') > -1) {
      console.log('gzip')
      this.set('Content-Encoding', 'gzip')
      this.body = zlib.gzipSync(JSON.stringify(jsonData))
    } else {
      this.body = JSON.stringify(jsonData)
    }
  }

  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}
