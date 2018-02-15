const ApiPerformenceController = require('../../controller/apiPerformence')
const FePerformenceController = require('../../controller/fePerformence')

module.exports = router => {
  router.get('/performence/api', ApiPerformenceController.getApiRecords)
  router.get('/performence/api/list', ApiPerformenceController.getApiList)
  router.get('/performence/api/calltime', ApiPerformenceController.getApiCallTime)
  router.get('/performence/api/avaragerestime', ApiPerformenceController.getApiAvarageResTime)
  router.get('/performence/api/log/error', ApiPerformenceController.getApiErrorLog)

  router.get('/performence/fe', FePerformenceController.getRecords)
  router.post('/performence/fe', FePerformenceController.addRecord)
  router.get('/performence/fe/statics', FePerformenceController.getPerformenceStatics)
}
