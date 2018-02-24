const crypto = require('crypto')
const salt = require('../../config').salt

/**
 * 用户密码加密
 * @param  {String} password 
 * @return {String} encryptedPasswd
 */
function encryptPwd(passwd) {
  const saltPasswd = passwd + ':' + salt
  const md5 = crypto.createHash('md5')       // md5加密
  const encryptedPasswd = md5.update(saltPasswd).digest('hex')

  return encryptedPasswd
}

module.exports = encryptPwd
