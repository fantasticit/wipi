const ArticleController = require('../../controller/article')

module.exports = router => {
  router.get('/article', ArticleController.get)
  router.post('/article/new', ArticleController.add)
  router.delete('/article/:id', ArticleController.delete)
}
