const ApiPerformenceController = require('../../controller/apiPerformence')
const logError = require('../logger/error')
const sendAlarmEmail = require('../mailer')

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
        ctx.response.body = { code: 'no', message: `token不存在或已过期` }
      } else if (statusCode === 500) {
        sendAlarmEmail(ctx.request.url, err)
      } else  {
        ctx.response.body = { errMsg }
      }

      logError(ctx, statusCode, err)

      await ApiPerformenceController.addApiRecord({
        statusCode,
        method: ctx.request.method,
        requestUrl: ctx.request.url,
        responseTime: 0,            // 出错，不记录响应时间
        errMsg: err.message,
        errStack: err.stack
      })
    }
  }
}
