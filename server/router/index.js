const router = require('koa-router')();
const article = require('./article');
const generateRoutes = require('./generateRoutes');
const qiniu = require('./qiniu');
const user = require('./user');

module.exports = function withRouter(app) {
  const prefix = app.config.router.prefix;
  router.prefix(prefix);

  article(app, router);
  generateRoutes(app, router);
  qiniu(app, router);
  user(app, router);
  app.use(router.routes()).use(router.allowedMethods());
};
