const UserModel = require('../models/user')

/**
 * 判断用户是不是admin
 * @param {*} userId 
 */
async function isAdmin(userId) {
  if (!userId) return false
  const userInfo = await UserModel.findById(userId)
  const roles = userInfo && userInfo.roles || false
  return roles && roles.indexOf('admin') > -1 || false
}

module.exports = isAdmin
