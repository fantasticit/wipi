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
    this.body = JSON.stringify(jsonData)
  }

  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}