const jwt = require('jsonwebtoken');

module.exports = app => {
  const model = app.model['user']
  const UserController = {}

  UserController.register = async ctx => {
    try {
      let { account, passwd } = ctx.request.body;

      if (!passwd) {
        ctx.throw(400, { message: '请输入密码' });
      }

      passwd = app.service.encrypt(passwd);

      const result = await model.create({ account, passwd }).catch(e => {
        if (e.code === 11000) {
          ctx.throw(400, { code: 'no', message: '用户已存在'});
        } else {
          ctx.throw(500);
        }
      })
      ctx.body = { code: 'ok', message: '注册成功', data: result };
    } catch (err) {
      ctx.body = err;
      throw new Error(err);
    }
  }

  UserController.login = async ctx => {
    try {
      let { account, passwd } = ctx.request.body;
      !passwd ? ctx.throw(400, { message: '请输入密码' }) : '';
      passwd = app.service.encrypt(passwd);

      const user = await model.findOne({ account, passwd }).catch(e => ctx.throw(500))

      if (!!user) {
        // 生成token
        const token = jwt.sign(
          { 
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
    } catch (err) {
      ctx.body = err;
      throw new Error(err);
    }
  }

  return UserController
}
