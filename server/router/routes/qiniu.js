const QiniuController = require('../../controller/qiniu')

module.exports = router => {
  router.get('/qiniu/token', QiniuController.getQiniuToken)
}
