const ArticleController = require('../../controller/article')

module.exports = router => {
  router.get('/article', ArticleController.getArticle)
  router.get('/article/meta/classifies', ArticleController.getArticleClassifies)
  router.post('/article/new', ArticleController.addArticle)
  router.get('/article/:id', ArticleController.getArticleById)
  router.patch('/article/:id', ArticleController.updateArticle)
  router.delete('/article/:id', ArticleController.deleteArticle)
}
