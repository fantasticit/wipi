const ApiPerformenceController = require('../../controller/apiPerformence')

module.exports = router => {
  router.get('/performence/api', ApiPerformenceController.getRecords)
  router.get('/performence/api/list', ApiPerformenceController.getApiList)
  router.get('/performence/api/calltime', ApiPerformenceController.getApiCallTime)
  router.get('/performence/api/res/time/avarage', ApiPerformenceController.getApiAvarageResTime)
}
