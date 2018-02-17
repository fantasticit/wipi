const jwt = require('jsonwebtoken')
const secret = require('../config').secret
const UserModel = require('../models/user')

// UserModel.create({ account: 'zx', password: 'zx123'})

module.exports = {
  register: async (ctx, next) => {
    const { account, password } = ctx.request.body
    const roles = ['admin', 'user']

    const result = await UserModel.create({ account, password, roles }).catch(e => {
      ctx.throw(500)
    })

    if (!!result) {
      ctx.send({ message: '注册成功', data: result })
    } else {
      ctx.throw(400, { message: '注册失败' })
    }
  },

  login: async (ctx, next) => {
    const { account, password } = ctx.request.body

    const res = await UserModel.findOne({ account, password }).catch(e => {
      ctx.throw(500)
    })

    if (!!res) {
      const token = jwt.sign({ account, roles: res.roles }, secret, { expiresIn: '1h' })
      ctx.send({ message: `登录成功`, data: token })
    } else {
      ctx.throw(400, { status: 'no', message: `账号或密码错误` })
    }
  }
}
