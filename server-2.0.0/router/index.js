const router = require('koa-router')()
const generateRoutes = require('./generateRoutes')

module.exports = function withRouter(app) {
  generateRoutes(app, router);
  app.use(router.routes()).use(router.allowedMethods());
};
