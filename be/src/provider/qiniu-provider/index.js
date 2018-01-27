import BaseHttp from '../base-http'

class _QiniuProvider extends BaseHttp {
  api = {
    token: '/qiniu/token',
  }

  constructor() {
    super()
  }

  async getQiniuToken() {
    const req = {
      url: this.api.token,
      method: 'GET',
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error('获取七牛上传Token失败')
    }
  }
}

export const QiniuProvider = new _QiniuProvider()
