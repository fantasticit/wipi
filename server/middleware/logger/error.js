/**
 * 错误日志
 * 用于响应码大于399情况
 */
const log4js = require('log4js')
const ApiPerformenceController = require('../../controller/apiPerformence')

module.exports = async (ctx, status, start = 0) => {
  log4js.configure(
    {
      appenders: { error: { type: 'dateFile', filename: 'log/error/access.log', keepFileExt: true } },
      categories: { default: { appenders: ['error'], level: 'error' } }
    }
  )
  const logger = log4js.getLogger('error')
  const method = ctx.request.method
  const url = ctx.request.url

  // 为ctx绑定error级别logger
  !ctx.logger && (ctx.logger ={})
  const methods = ['error', 'fatal']
  methods.map(method => {
    ctx.logger[method] = message => logger[method](message)
  })

  let level = 'error'
  if (status[0] > 4) {
    level = 'fatal'
  }

  const responseTime = (Date.now() - start) / 1000

  ctx.logger[level](`
    ${method} ${url} ${status} 
      req: ${JSON.stringify(ctx.request.body) || ''} 
      res: ${JSON.stringify(ctx.response.body) || ''}
      响应时间为: ${responseTime}s
  `)

  await ApiPerformenceController.addRecord({
    statusCode: status,
    method,
    requestUrl: url,
    responseTime
  })
}
