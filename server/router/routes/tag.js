const ArticleController = require('../../controller/article')

module.exports = router => {
  router.get('/tag', ArticleController.tag.getTags)               // 获取文章标签
  router.post('/tag', ArticleController.tag.addTag)               // 添加文章标签

  router.get('/tag/:id', ArticleController.tag.getTag)            // 获取指定Id文章标签
  router.patch('/tag/:id', ArticleController.tag.updateTag)       // 更新指定Id文章标签
  router.delete('/tag/:id', ArticleController.tag.deleteTag)      // 删除文章标签
}
