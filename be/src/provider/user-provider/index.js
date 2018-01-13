import BaseHttp from '../base-http'

class _UserProvider extends BaseHttp {
  api = {
    register: '/user/register',
    login: '/user/login',
  }

  constructor() {
    super()
  }

  async register({account, password}) {
    const req = {
      url: this.api.register,
      method: 'POST',
      data: { account, password },
    }

    try {
      const res = await this.http(req)
      return `${account}, 注册成功`
    } catch (err) {
      throw new Error(err)
    }
  }

  async login({account, password}) {
    const req = {
      url: this.api.login,
      method: 'POST',
      data: { account, password },
    }

    try {
      const res = await this.http(req)
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const UserProvider = new _UserProvider()
