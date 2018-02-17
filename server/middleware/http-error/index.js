const ApiPerformenceController = require('../../controller/apiPerformence')

/**
 * 错误处理中间件
 * @returns function
 */
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const statusCode = err.statusCode || err.status || 500
      const errMsg = err.message || '服务器错误'
      ctx.response.status = statusCode

      if (statusCode === 401) {
        ctx.status = 401
        ctx.response.body = { status: 'no', message: `token不存在或已过期` }
      } else  {
        ctx.response.body = { errMsg }
      }

      await ApiPerformenceController.addApiRecord({
        statusCode,
        method: ctx.request.method,
        requestUrl: ctx.request.url,
        responseTime: 0,
        errMsg: err.message,
        errStack: err.stack
      })
    }
  }
}
