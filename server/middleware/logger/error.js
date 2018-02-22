/**
 * 错误日志
 * 用于响应码大于399情况
 */
const log4js = require('log4js')

module.exports = async (ctx, status, err) => {
  log4js.configure(
    {
      appenders: { 
        error: { type: 'dateFile', filename: 'log/error/access.log', keepFileExt: true } 
      },
      categories: { default: { appenders: ['error'], level: 'error' } }
    }
  )
  const logger = log4js.getLogger('error')

  let level = status[0] > 4 ? 'fatal' : 'error'

  logger[level](`
    ${ctx.request.method} ${ctx.request.url} ${status} 
      req: ${JSON.stringify(ctx.request.body) || ''} 
      res: ${JSON.stringify(ctx.response.body) || ''}
      errMsg: ${err.message}
      errStack: ${err.stack}
  `)
}
