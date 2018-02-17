const jwt = require('jsonwebtoken')
const secret = require('../config').secret
const UserModel = require('../models/user')

// UserModel.create({ account: 'zx', password: 'zx123', roles: ['admin', 'user']})

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
      const token = jwt.sign(
        { 
          id: res._id,
          account, 
          password, 
          avatar: res.avatar,
          roles: res.roles, 
          lastLoginTime: res.lastLoginTime
        }, 
        secret, 
        { expiresIn: '1h' }
      )
      ctx.send({ message: `登录成功`, data: token })

      // 更新最后登录时间
      await UserModel.findOneAndUpdate({ account, password }, { lastLoginTime: Date.now() })
    } else {
      ctx.throw(400, { status: 'no', message: `账号或密码错误` })
    }
  },

  update: async (ctx, next) => {
    const { id } = ctx.params
    const { account, password, avatar } = ctx.request.body

    await UserModel.findByIdAndUpdate(id, { account, password, avatar })
      .catch(e => e.throw(500))
    ctx.send({ status: 'ok', message: '修改成功，请重新登录' })
  }
}
