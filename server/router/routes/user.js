const UserController = require('../../controller/user')

module.exports = router => {
  router.post('/user/register', UserController.register)
  router.post('/user/login', UserController.login)
}
