const router = require('koa-router')()
const generateRoutes = require('./generateRoutes')
const user = require('./user')

module.exports = function withRouter(app) {
  const prefix = app.config.router.prefix;
  router.prefix(prefix);
  generateRoutes(app, router);
  user(app, router);
  app.use(router.routes()).use(router.allowedMethods());
};
