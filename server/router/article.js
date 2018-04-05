module.exports = (app, router) => {
  const controller = app.controller.article;

  router.get('/article/classifyStats', controller.getClassifyStats);
  router.get('/article/recommend', controller.getRecommendArticles);
}
