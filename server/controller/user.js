const UserModel = require('../models/user')

module.exports = {
  register: async (ctx, next) => {
    const { account, password } = ctx.request.body
    const roles = ['admin', 'user']
    
    try {
      const result = await UserModel.create({ account, password, roles })
      if (result !== null) {
        ctx.send({ status: 'ok', message: '注册成功', data: result })
      } else {
        ctx.send({ status: 'no', message: '注册失败' })
      }
    } catch (err) {
      console.log(err)
    }
  },

  login: async (ctx, next) => {
    const { account, password } = ctx.request.body

    try {
      const res = await UserModel.findOne({ account, password })
      if (res !== null) {
        ctx.send({ status: 'ok', message: `登录成功`, data: res })
      } else {
        ctx.send({ status: 'no', message: `账号或密码错误` })
      }
    } catch (err) {
      console.log(err)
    }
  }
}