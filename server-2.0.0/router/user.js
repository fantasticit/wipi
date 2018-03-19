module.exports = (app, router) => {
  const prefix = app.config.router.prefix;
  const controller = app.controller.user;

  router.post(`/user/register`, controller.register);
  router.post(`/user/login`, controller.login);
}
