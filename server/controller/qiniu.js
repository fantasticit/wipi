const qiniu = require('qiniu')
const accessKey = 'qCuhQDHLx_XFQnvsVfpWlRdb1oYAHTY0fj28bxHu'
const secretKey = '2Rr3QAZd79rb_SnAr6wb2cVmaTo6MVM-_r-Ocn_6'
const scope = 'coding-heart'
const expires = 7200
const options = { scope, expires }

module.exports = {
  getQiniuToken: async (ctx, next) => {
    try {
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
      const putPolicy = new qiniu.rs.PutPolicy(options)
      const uploadToken = putPolicy.uploadToken(mac)

      ctx.send({status: 'ok', message: '七牛上传凭证创建成功', data: uploadToken})
    } catch (e) {
      ctx.send({status: 'no', message: '七牛上传凭证创建失败'})
    }
  }
}
