const zlib = require('zlib')


module.exports = () => {
  function render(jsonData) {
    this.set('Content-Type', 'application/json')
    const acceptEncoding = this.request.headers['accept-encoding']

    if (acceptEncoding && acceptEncoding.indexOf('gzip') > -1) {
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
