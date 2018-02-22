const zlib = require('zlib')


module.exports = () => {
  function render(jsonData) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify(jsonData)
  }

  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}
