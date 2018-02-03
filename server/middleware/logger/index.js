const normalLogger = require('./normal')
const errorLogger = require('./error')

module.exports = () => {
  return async (ctx, next) => {
    const start = Date.now()
    await next()
    const status = JSON.stringify(ctx.response.status || ctx.response.statusCode || 500)

    if (status >= 200 & status <= 399) {
      normalLogger(ctx, status, start)
    } else {
      errorLogger(ctx, status)
    }
  }
}
