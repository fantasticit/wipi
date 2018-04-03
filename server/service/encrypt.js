const crypto = require('crypto')

module.exports = config => passwd => {
  const saltPasswd = passwd + ':' + config.encrypt.salt
  const md5 = crypto.createHash('md5')       // md5加密
  const encryptedPasswd = md5.update(saltPasswd).digest('hex')

  return encryptedPasswd
}
