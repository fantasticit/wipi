module.exports = (app, router) => {
  const prefix = app.config.router.prefix;
  const controller = app.controller.user;

  router.get('/user', controller.getUsers);
  router.delete('/user', controller.deleteUser);
  router.post('/user/check', controller.checkAccountExist);
  router.post(`/user/register`, controller.register);
  router.post(`/user/login`, controller.login);
  router.patch('/user/:id', controller.updateById);
}
