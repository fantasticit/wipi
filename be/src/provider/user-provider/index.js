import BaseHttp from '../base-http'

class _UserProvider extends BaseHttp {
  api = {
    register: '/user/register',
    login: '/user/login',
    update: '/user/',
    getUsers: '/user/',
    deleteUser: '/user/',
    check: '/user/checkaccount',
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

  async update(id, {account, password, avatar}) {
    const req = {
      url: this.api.update + id,
      method: 'POST',
      data: { account, password, avatar },
    }

    try {
      const res = await this.http(req)
      return res.message
    } catch (err) {
      throw new Error(err)
    }
  }

  async checkAccountExist(account) {
    const req = {
      url: this.api.check,
      method: 'POST',
      data: { account },
    }

    try {
      const res = await this.http(req)
      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  async getUsers(query) {
    console.log(query)
    query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

    const req = {
      url: this.api.getUsers + '?' + query,
      method: 'get',
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteUser(userId, deletedUserId) {
    const req = {
      url: this.api.deleteUser,
      method: 'delete',
      data: { userId, deletedUserId }
    }

    try {
      const res = await this.http(req)
      return res.message
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const UserProvider = new _UserProvider()
