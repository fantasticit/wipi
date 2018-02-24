const ErrorController = require('../../controller/error')

module.exports = router => {
  /**
   * API接口错误记录
   */
  router.get('/error/api', ErrorController.api.getRecords)
  
  /**
   * 前端页面错误记录路由
   */
  router.get('/error/webpage', ErrorController.webpage.getRecords)
  router.post('/error/webpage', ErrorController.webpage.addRecord)
}
