const qiniu = require('qiniu')
const accessKey = 'qCuhQDHLx_XFQnvsVfpWlRdb1oYAHTY0fj28bxHu'
const secretKey = '2Rr3QAZd79rb_SnAr6wb2cVmaTo6MVM-_r-Ocn_6'
const scope = 'coding-heart'
const expires = 7200

const options = { scope, expires }

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
console.log(uploadToken)
