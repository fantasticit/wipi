const FePerformenceController = require('../../controller/fePerformence')

module.exports = router => {
  router.get('/feperformence', FePerformenceController.getRecords)
  router.get('/feperformence/statics', FePerformenceController.getPerformenceStatics)
  router.post('/feperformence', FePerformenceController.addRecord)
}
