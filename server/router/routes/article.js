const ArticleController = require('../../controller/article')

module.exports = router => {
  router.get('/article', ArticleController.get)
  router.post('/article/new', ArticleController.add)
  router.get('/article/:id', ArticleController.getById)
  router.patch('/article/:id', ArticleController.update)
  router.delete('/article/:id', ArticleController.delete)
}
