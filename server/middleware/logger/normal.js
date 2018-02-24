const log4js = require('log4js')
const PerformenceContoller = require('../../controller/performence').api

module.exports = async (method, url, status, start = 0) => {
  log4js.configure(
    {
      appenders: { 
        normal: { type: 'dateFile', filename: 'log/normal/access.log', keepFileExt: true } 
      },
      categories: { default: { appenders: ['normal'], level: 'info' } }
    }
  )
  const logger = log4js.getLogger('normal')
  const responseTime = (Date.now() - start)
  logger.info(`${method} ${url} 响应时间为: ${responseTime / 1000}s`)

  /**
   * 记录访问记录
   */
  url = url.split('/')[1]
  await PerformenceContoller.addRecord({
    statusCode: status,
    method,
    requestUrl: url,
    responseTime
  })
}
