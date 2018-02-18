const jwt = require('jsonwebtoken')
const secret = require('../config').secret
const UserModel = require('../models/user')

// UserModel.create({ account: 'zx', password: 'zx123', roles: ['admin', 'user']})

async function checkAccount(ctx) {
  const { account } = ctx.request.body

  const res = await UserModel.findOne({ account }).catch(e => {
    ctx.throw(500)
  })

  return !!res
}

async function judgeIsAdmin(userId) {
  const userInfo = await UserModel.findById(userId).catch(e => ctx.throw(500))
  const roles = userInfo.roles

  if (roles.indexOf('admin') > -1) {
    return true
  } else {
    return false
  }
}

module.exports = {
  checkAccountExsit: async (ctx, next) => {
    const res = await checkAccount(ctx)

    if (res) {
      ctx.send({status: 'no', message: '用户已存在'})
    } else {
      ctx.send({status: 'ok', message: '可以注册' })
    }
  },

  register: async (ctx, next) => {
    const { account, password } = ctx.request.body
    const userExist = await checkAccount(ctx)

    if (userExist) {
      ctx.send({status: 'no', message: '用户已存在'})
    } else {
      const roles = ['user']
      const result = await UserModel.create({ account, password, roles }).catch(e => {
        ctx.throw(500)
      })

      if (!!result) {
        ctx.send({ message: '注册成功', data: result })
      } else {
        ctx.throw(400, { message: '注册失败' })
      }
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

    if (!id) {
      ctx.throw(400, { message: '修改失败' })
    }

    await UserModel.findByIdAndUpdate(id, { account, password, avatar })
      .catch(e => e.throw(500))
    ctx.send({ status: 'ok', message: '修改成功，请重新登录' })
  },

  getUsers: async (ctx, next) => {
    let { userId, page, pageSize } = ctx.query
    page = +page
    pageSize = +pageSize
    const skip = page === 0 ? 0 : (page - 1) * pageSize

    const isAdmin = judgeIsAdmin(userId)

    if (isAdmin) {
      const users = await UserModel.find().limit(pageSize).skip(skip)
        .catch(e => ctx.throw(500))
      const total = await UserModel.find().count().catch(e => ctx.throw(500))
      ctx.send({ status: 'ok', message: '获取用户列表成功', data: { 
        items: users,
        total
      }})
    } else {
      ctx.send(403, { message: '非管理员禁止查看用户列表' })
    }
  },

  deleteUser: async (ctx, next) => {
    let { userId, deletedUserId } = ctx.request.body

    const isAdmin = judgeIsAdmin(userId)

    if (isAdmin) {
      await UserModel.findByIdAndRemove(deletedUserId)
        .catch(e => ctx.throw(500))

      ctx.send({ status: 'ok', message: '删除用户成功'})
    } else {
      ctx.send(403, { message: '非管理员禁止删除用户' })
    }
  }
}
