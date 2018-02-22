const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret
const salt = require('../config').salt
const UserModel = require('../models/user')

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

/**
 * 判断用户是不是admin
 * @param {*} userId 
 */
async function isAdmin(userId) {
  if (!userId) return false
  const userInfo = await UserModel
                          .findById(userId)
                          .catch(e => ctx.throw(500))
  const roles = userInfo && userInfo.roles || false

  return roles && roles.indexOf('admin') > -1 || false
}

// UserModel.create({
//   account: 'admin',
//   passwd: encryptPwd('123456'),
//   roles: ['admin', 'user']
// })

class UserController {
  static constructor() {}

  /**
   * 检查用户名是否已存在
   */
  static async checkAccountExist(ctx) {
    const { account } = ctx.request.body
    let isExisted = await UserModel.findOne({ account }).catch(e=> ctx.throw(500))
    isExisted = !!isExisted

    if (isExisted) {
      ctx.send({code: 'no', message: '账户已存在'})
    } else {
      ctx.send({code: 'ok', message: '可以注册' })
    }
  }

  /** 
   * 用户注册
   */
  static async register(ctx) {
    let { account, passwd } = ctx.request.body

    if (!passwd) {
      ctx.throw(400, { message: '请输入密码' })
    }

    let isExisted = await UserModel.findOne({ account }).catch(e=> ctx.throw(500))
    isExisted = !!isExisted

    if (isExisted) {
      ctx.send({ code: 'no', message: '用户已存在'})
    } else {
      passwd = encryptPwd(passwd)
      const result = await UserModel.create({ account, passwd }).catch(e => ctx.throw(500))

      ctx.send({ code: 'ok', message: '注册成功', data: result })
    }
  }

  /** 
   * 用户登录
   */
  static async login(ctx) {
    let { account, passwd } = ctx.request.body
    passwd = encryptPwd(passwd)

    const user = await UserModel.findOne({ account, passwd }).catch(e => ctx.throw(500))

    if (!!user) {
      // 生成token
      const token = jwt.sign(
        { 
          id: user._id,
          account,
          avatar: user.avatar,
          roles: user.roles, 
          lastLoginTime: user.lastLoginTime,
          createdTime: user.createdTime
        }, 
        secret,
        { expiresIn: '1h' }
      )
      ctx.send({ code: 'ok', message: `登录成功`, data: token })

      // 更新最后登录时间
      await UserModel.findByIdAndUpdate(user._id, { lastLoginTime: Date.now() })
    } else {
      ctx.throw(400, { message: `账号或密码错误` })
    }
  }

  /** 
   * 用户信息更新
   */
  static async update(ctx) {
    const { id } = ctx.params
    let { action } = ctx.request.body
    
    if (!id) {
      ctx.throw(400, { message: '修改失败' })
    }

    switch (action) {
      // 修改头像
      case 'modifyAvatar': 
        let { avatar } = ctx.request.body
        await UserModel.findByIdAndUpdate(id, { avatar })
          .catch(e => e.throw(500))
        ctx.send({ code: 'ok', message: '头像已修改' })
        break
      
      // 修改密码
      case 'modifyPasswd':
        let { oldPasswd, newPasswd, } = ctx.request.body
          
        if (!oldPasswd || !newPasswd) {
          ctx.throw(400, { message: '请输入密码' })
        }
    
        oldPasswd = encryptPwd(oldPasswd)
        const user = await UserModel.findById(id).catch(e => ctx.throw(500))
    
        if (user.passwd !== oldPasswd) {
          ctx.throw(400, { message: '原密码错误' })
        } else {
          newPasswd = encryptPwd(newPasswd)
          await UserModel.findByIdAndUpdate(id, { passwd: newPasswd })
          .catch(e => e.throw(500))
          ctx.send({ code: 'ok', message: '修改成功，请重新登录' })
        }
        break
      
      // 修改账户
      case 'modifyAccount':
        let { account } = ctx.request.body
        let isExisted = await UserModel.findOne({ account }).where('_id').ne(id).catch(e=> ctx.throw(500))
        isExisted = !!isExisted
        if (isExisted) {
          ctx.throw(400, { message: '用户已存在' })
        } else {
          await UserModel.findByIdAndUpdate(id, { account }).catch(e => e.throw(500))
          ctx.send({ code: 'ok', message: '账户已修改' })
        }
        break
      
      default: 
        ctx.send({ code: 'ok', message: '未作修改' })
    }
  }

  /**
   * 获取用户信息
   * 只有管理员可获取
   */
  static async getUsers(ctx) {
    let { userId, page, pageSize } = ctx.query
    page = +page
    pageSize = +pageSize
    const skip = page === 0 ? 0 : (page - 1) * pageSize

    if (await isAdmin(userId)) {
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
  }

  static async deleteUser(ctx, next) {
    let { userId, deletedUserId } = ctx.request.body

    if (isAdmin(userId)) {
      await UserModel.findByIdAndRemove(deletedUserId)
        .catch(e => ctx.throw(500))

      ctx.send({ status: 'ok', message: '删除用户成功'})
    } else {
      ctx.send(403, { message: '非管理员禁止删除用户' })
    }
  }
}

module.exports = UserController