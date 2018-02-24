const PerformenceContoller = require('../../controller/performence')

module.exports = router => {
  /**
   * 接口性能记录
   */
  router.get('/performence/api', PerformenceContoller.api.getRecords)
  router.get('/performence/api/list', PerformenceContoller.api.getApiList)
  router.get('/performence/api/list/restime', PerformenceContoller.api.getApiAvarageResTime)
  router.get('/performence/api/list/calltime', PerformenceContoller.api.getApiCallTime)

  /**
   * 前端页面性能记录
   */
  router.get('/performence/webpage', PerformenceContoller.webpage.getRecords)
  router.post('/performence/webpage', PerformenceContoller.webpage.addRecord)
}
