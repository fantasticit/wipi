const qiniu = require('qiniu')

module.exports = app => {
  const config = app.config['qiniu'];

  const accessKey = config.accessKey;
  const secretKey = config.secretKey;
  const scope = config.scope;
  const expires = config.expires;
  const options = { scope, expires }
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy(options)

  return {
    getQiniuToken: async (ctx, next) => {
      try {
        const uploadToken = putPolicy.uploadToken(mac)
        ctx.body = ({code: 'ok', message: '七牛上传凭证创建成功', data: uploadToken})
      } catch (e) {
        ctx.body = ({code: 'no', message: '七牛上传凭证创建失败'})
      }
    }
  }
}
