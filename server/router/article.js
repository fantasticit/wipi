module.exports = (app, router) => {
  const controller = app.controller.article;

  router.get('/article/classifyStats', controller.getClassifyStats);
}
