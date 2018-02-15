const FeErrorController = require('../../controller/error-fe')

module.exports = router => {
  router.get('/performence/error/fe', FeErrorController.getRecords)
  router.post('/performence/error/fe', FeErrorController.addRecord)
}