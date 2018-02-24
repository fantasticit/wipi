const UserModel = require('../../models/user')

/**
 * 判断用户是不是admin
 * @param {*} userId 
 */
async function isAdmin(userId) {
  console.log(userId)

  if (!userId) return false
  const userInfo = await UserModel
    .findById(userId)
    .catch(e => ctx.throw(500))
  const roles = userInfo && userInfo.roles || false

  console.log(userInfo)

  return roles && roles.indexOf('admin') > -1 || false
}

module.exports = isAdmin
