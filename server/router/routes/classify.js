const ArticleController = require('../../controller/article')

module.exports = router => {
  router.get('/classify', ArticleController.classify.getClassifies) // 获取文章分类
  router.post('/classify', ArticleController.classify.addClassify)  // 添加文章分类

  router.get('/classify/:id', ArticleController.classify.getClassify)            // 获取指定Id文章分类
  router.patch('/classify/:id', ArticleController.classify.updateClassify)       // 更新指定Id文章分类
  router.delete('/classify/:id', ArticleController.classify.deleteClassify)      // 删除文章分类
}
