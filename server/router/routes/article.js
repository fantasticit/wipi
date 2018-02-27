const ArticleController = require('../../controller/article')

module.exports = router => {
  router.get('/article', ArticleController.article.getArticle)                 // 获取文章
  router.get('/article/publish/recent', ArticleController.article.getRecentPublishedArticle)  // 获取文章
  router.post('/article/new', ArticleController.article.addArticle)            // 新增文章
  router.get('/article/:id', ArticleController.article.getArticleById)         // 获取指定文章
  router.patch('/article/:id', ArticleController.article.updateArticle)        // 更新文章
  router.delete('/article/:id', ArticleController.article.deleteArticle)       // 删除文章
}
