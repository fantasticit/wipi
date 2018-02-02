const log4js = require('log4js')
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

module.exports = () => {
  log4js.configure({
    appenders: { cheese: { type: 'dateFile', filename: 'log/access.log', pattern: '.yyyy-MM-dd-hh', keepFileExt: true } },
    categories: { default: { appenders: ['cheese'], level: 'info' } }
  })

  const logger = log4js.getLogger('cheese')

  return async (ctx, next) => {
    const method = ctx.request.method
    const url = ctx.request.url
    const start = Date.now()

    // 为ctx绑定各个级别logger
    const ctxLogger = {}
    methods.forEach((method, i) => {
      ctxLogger[method] = (message) => {
        logger[method](message)
      }
    })
    ctx.logger = ctxLogger

    await next()

    const status = ctx.response.status
    if (!(status >= 200 && status <= 399)) {
      ctx.logger.error(`${method} ${url} ${status} ${ctx.response.body && ctx.response.body.errMsg || ''}`)
    }

    const responseTime = Date.now() - start
    logger.info(`${method} ${url} 响应时间为: ${responseTime/1000}s`)
  }
}
