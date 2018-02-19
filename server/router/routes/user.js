const UserController = require('../../controller/user')

module.exports = router => {
  router.get('/user', UserController.getUsers)
  // router.delete('/user', UserController.deleteUser)
  router.post('/user/register', UserController.register)
  router.post('/user/login', UserController.login)
  router.post('/user/check/account', UserController.checkAccountExist)
  router.patch('/user/:id', UserController.update)
}
