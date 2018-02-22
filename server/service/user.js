const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret
const salt = require('../config').salt
const UserModel = require('../models/user')

class UserService {
  /**
   * 用户密码加密
   * @param  {String} password 
   * @return {String} encryptedPasswd
   */
  static encryptPwd(passwd) {
    const saltPasswd = passwd + ':' + salt
    const md5 = crypto.createHash('md5')       // md5加密
    const encryptedPasswd = md5.update(saltPasswd).digest('hex')

    return encryptedPasswd
  }

  /**
   * 判断用户是不是admin
   * @param {*} userId 
   */
  static async isAdmin(userId) {
    if (!userId) return false

    const userInfo = await UserModel
      .findById(userId)
      .catch(e => ctx.throw(500))
    const roles = userInfo && userInfo.roles || false

    return roles && roles.indexOf('admin') > -1 || false
  }

  /**
   * 检查用户名是否已存在
   */
  static async isAccountExist(account) {
    let isExisted = await UserModel
      .findOne({ account })
      .catch(e=> new Error(e))
    
    return !!isExisted
  }

  /** 
   * 用户注册
   */
  static async register(account, passwd) {
    passwd = this.encryptPwd(passwd)
    const result = await UserModel
      .create({ account, passwd })
      .catch(e => { throw new Error('注册失败') })
    
    return result
  }

  /**
   * 生成用户token
   * @param {*} account 
   * @param {*} passwd 
   */
  static async getToken(account, passwd) {
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
      { expiresIn: '2h' }
    )
    return token
  }

  /**
   * 修改账户
   * @param {*} account 
   */
  static async modifyAccount(userId, account) {
    let { account } = ctx.request.body
    await UserModel.findByIdAndUpdate(userId, { account })
      .catch(e => { throw new Error(e) })
  }

  /**
   * 修改头像
   * @param {*} avatar 
   */
  static async modifyAvatar(userId, avatar) {
    let { avatar } = ctx.request.body
    await UserModel.findByIdAndUpdate(userId, { avatar })
      .catch(e => { throw new Error(e) })
  }

  /**
   * 修改密码
   * @param {*} userId 
   * @param {*} newPasswd 
   */
  static async modifyPasswd(userId, newPasswd) {
    newPasswd = this.encryptPwd(newPasswd)
    await UserModel.findByIdAndUpdate(userId, { passwd: newPasswd })
      .catch(e => { throw new Error(e) })
  }

  /**
   * 分页获取用户信息
   * @param {*} pageSize 
   * @param {*} skip 
   */
  static async getUsers(pageSize, skip) {
    const users = await UserModel
        .find()
        .limit(pageSize)
        .skip(skip)
        .catch(e => { throw new Error(e) })
    const total = await UserModel
        .find()
        .count()
        .catch(e => { throw new Error(e) })
    return { 
      items: users,
      total
    }
  }

  /**
   * 删除用户
   * @param {*} deletedUserId 
   */
  static async deleteUser(deletedUserId) {
    await UserModel.findByIdAndRemove()
        .catch(e => {throw new Error(e)})
  }
}

module.exports = UserService
