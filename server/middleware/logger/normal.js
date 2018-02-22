const log4js = require('log4js')
// const ApiPerformenceController = require('../../controller/apiPerformence')
module.exports = async (method, url, start = 0) => {
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
}

  // if (/article/ig.test(url)) { // article系列接口只存储/article路径
  //   url = '/article'
  // } else if (/user/ig.test(url)) {
  //   url = '/user'
  // }

  // await ApiPerformenceController.addApiRecord({
  //   statusCode: status,
  //   method,
  //   requestUrl: url,
  //   responseTime
  // })
