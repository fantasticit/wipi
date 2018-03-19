const jwt = require('jsonwebtoken');

module.exports = app => {
  const model = app.model['user']
  const UserController = {}

  UserController.checkAccountExist = async(ctx) => {
    const { account } = ctx.request.body
    let isExisted = await model.findOne({ account }).catch(e=> ctx.throw(500))
    isExisted = !!isExisted

    if (isExisted) {
      ctx.body = ({code: 'no', message: '账户已存在'})
    } else {
      ctx.body = ({code: 'ok', message: '可以注册' })
    }
  }

  UserController.register = async ctx => {
    let { account, passwd, roles = ['admin', 'user'] } = ctx.request.body;
    !passwd ? ctx.throw(400, { message: '请输入密码' }) : '';
    passwd = app.service.encrypt(passwd);

    const result = await model.create({ account, passwd, roles }).catch(e => {
      if (e.code === 11000) {
        ctx.throw(400, { code: 'no', message: '用户已存在'});
      } else {
        ctx.throw(500);
      }
    })
    ctx.body = { code: 'ok', message: '注册成功', data: result };
  }

  UserController.update = async ctx => {
    const { id } = ctx.params
    let { action } = ctx.request.body
    
    if (!id) {
      ctx.throw(400, { message: '修改失败' })
    }

    switch (action) {
      // 修改头像
      case 'modifyAvatar': 
        let { avatar } = ctx.request.body
        await model.findByIdAndUpdate(id, { avatar })
          .catch(e => e.throw(500))
        ctx.body = ({ code: 'ok', message: '头像已修改' })
        break
      
      // 修改密码
      case 'modifyPasswd':
        let { oldPasswd, newPasswd, } = ctx.request.body
          
        if (!oldPasswd || !newPasswd) {
          ctx.throw(400, { message: '请输入密码' })
        }
    
        oldPasswd = encryptPwd(oldPasswd)
        const user = await model.findById(id).catch(e => ctx.throw(500))
    
        if (user.passwd !== oldPasswd) {
          ctx.throw(400, { message: '原密码错误' })
        } else {
          newPasswd = encryptPwd(newPasswd)
          await model.findByIdAndUpdate(id, { passwd: newPasswd })
          .catch(e => e.throw(500))
          ctx.body = ({ code: 'ok', message: '修改成功，请重新登录' })
        }
        break
      
      // 修改账户
      case 'modifyAccount':
        let { account } = ctx.request.body
        let isExisted = await model.findOne({ account }).where('_id').ne(id).catch(e=> ctx.throw(500))
        isExisted = !!isExisted
        if (isExisted) {
          ctx.throw(400, { message: '用户已存在' })
        } else {
          await model.findByIdAndUpdate(id, { account }).catch(e => e.throw(500))
          ctx.body = ({ code: 'ok', message: '账户已修改' })
        }
        break
      
      default: 
        ctx.body = ({ code: 'ok', message: '未作修改' })
    }
  }

  UserController.login = async ctx => {
    let { account, passwd } = ctx.request.body;
    !passwd ? ctx.throw(400, { message: '请输入密码' }) : '';
    passwd = app.service.encrypt(passwd);

    const user = await model.findOne({ account, passwd }).catch(e => ctx.throw(500))

    if (!!user) {
      // 生成token
      const token = jwt.sign({ 
          id: user._id,
          account,
          avatar: user.avatar,
          roles: user.roles, 
          lastLoginAt: user.lastLoginAt,
          createAt: user.createAt
        }, 
        app.config.token.secret,
        { expiresIn: app.config.token.expires }
      )
      ctx.body = ({ code: 'ok', message: `登录成功`, data: token })
      // 更新最后登录时间
      await model.findByIdAndUpdate(user._id, { lastLoginAt: Date.now() })
    } else {
      ctx.throw(400, { message: `账号或密码错误` })
    }
  }

  UserController.getUsers =  async (ctx) => {
    let { userId, page, pageSize } = ctx.query
    page = +page
    pageSize = +pageSize
    const skip = page === 0 ? 0 : (page - 1) * pageSize

    const can = await app.service.isAdmin(userId)

    if (can) {
      const users = await model.find().limit(pageSize).skip(skip)
        .catch(e => ctx.throw(500))
      const total = await model.find().count().catch(e => ctx.throw(500))
      ctx.body = ({ status: 'ok', message: '获取用户列表成功', data: { 
        items: users,
        total
      }})
    } else {
      ctx.throw(403, { message: '非管理员禁止查看用户列表' })
    }
  }

  UserController.deleteUser = async (ctx, next) => {
    let { userId, deletedUserId } = ctx.request.body

    const can = await app.service.isAdmin(userId)

    if (can) {
      await model.findByIdAndRemove(deletedUserId)
        .catch(e => ctx.throw(500))

      ctx.body = ({ status: 'ok', message: '删除用户成功'})
    } else {
      ctx.throw(403, { message: '非管理员禁止删除用户' })
    }
  }

  return UserController
}
