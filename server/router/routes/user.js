const UserController = require('../../controller/user')

module.exports = router => {
  router.get('/user', UserController.getUsers)
  router.delete('/user', UserController.deleteUser)
  router.post('/user/register', UserController.register)
  router.post('/user/login', UserController.login)
  router.post('/user/checkaccount', UserController.checkAccountExsit)
  router.post('/user/:id', UserController.update)
}
