import BaseHttp from '../base-http'

class _UserProvider extends BaseHttp {
  api = {
    basic: '/user',
    register: '/register',
    login: '/login',
    checkAccountExist: '/check/account',
  }

  constructor() {
    super()
  }

  async checkAccountExist(account) {
    const req = {
      url: this.apiResolve('checkAccountExist'),
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

  async register({account, passwd}) {
    const req = {
      url: this.apiResolve('register'),
      method: 'POST',
      data: { account, passwd },
    }

    try {
      const res = await this.http(req)
      return `${account}, 注册成功`
    } catch (err) {
      throw new Error(err)
    }
  }

  async login({account, passwd}) {
    const req = {
      url: this.apiResolve('login'),
      method: 'POST',
      data: { account, passwd },
    }

    try {
      const res = await this.http(req)
      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(userId, {
    account, 
    oldPasswd, 
    newPasswd, 
    avatar, 
    action = 'modifyAccount'}
  ) {
    const req = {
      url: this.api.basic + '/' + userId,
      method: 'PATCH',
      data: { account, oldPasswd, newPasswd, avatar, action },
    }

    console.log(req)

    try {
      const res = await this.http(req)
      return res.message
    } catch (err) {
      throw new Error(err)
    }
  }

  async getUsers(query) {
    console.log(query)
    query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

    const req = {
      url: this.api.basic + '?' + query,
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
      url: this.api.basic,
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
