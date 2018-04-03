import BaseHttp from '../base-http'

class _QiniuProvider extends BaseHttp {
  api = {
    token: '/qiniu/token',
    upload: 'https://upload.qiniu.com/',
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
      throw new Error(err)
    }
  }

  async uploadImage(file, token) {
    let fileName = file.name
    let param = new FormData()
    param.append('chunk', 0)
    param.append('chunk', 1)
    param.append('file', file, fileName)
    param.append('token', token)

    const req = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: this.api.upload,
      method: 'Post',
      data: param,
    }

    try {
      const res = await this.http(req)
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const QiniuProvider = new _QiniuProvider()
