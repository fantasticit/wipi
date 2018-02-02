const log4js = require('log4js')
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

module.exports = () => {
  const ctxLogger = {}
  log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'log/cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'info' } }
  })

  const logger = log4js.getLogger('cheese')

  return async (ctx, next) => {
    const start = Date.now()
    // methods.forEach((method, i) => {
    //   ctxLogger[method] = (message) => {
    //     logger[method](message)
    //   }
    // })
    // ctx.log = ctxLogger

    await next()
    const responseTime = Date.now() - start;
    logger.info(`响应时间为${responseTime/1000}s`);
  }
}
