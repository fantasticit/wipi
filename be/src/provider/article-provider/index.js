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

  async get(query) {
    query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

    const req = {
      url: this.api.get,
      method: 'GET',
    }

    req.url += '?'+ query

    try {
      const res = await this.http(req)
      return {
        items: res.data.items,
        total: res.data.total
      }
    } catch (err) {
      throw new Error('获取文章失败')
    }
  }
}

export const ArticleProvider = new _ArticleProvider()
