module.exports = (app, router) => {
  const prefix = app.config.router.prefix;
  const controller = app.controller.qiniu;

  router.get('/qiniu/token', controller.getQiniuToken);
}
