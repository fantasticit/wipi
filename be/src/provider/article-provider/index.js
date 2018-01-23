import BaseHttp from '../base-http'

class _ArticleProvider extends BaseHttp {
  api = {
    get: '/article',
    add: '/article/new',
  }

  constructor() {
    super()
  }

  async add(article) {
    const req = {
      url: this.api.add,
      method: 'POST',
      data: article
    }

    try {
      const res = await this.http(req)
      return `发表文章成功`
    } catch (err) {
      throw new Error(err)
    }
  }

  async get() {
    const req = {
      url: this.api.get,
      method: 'GET',
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error('获取文章失败')
    }
  }
}

export const ArticleProvider = new _ArticleProvider()
