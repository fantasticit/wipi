import BaseHttp from '../base-http'

class _ArticleProvider extends BaseHttp {
  api = {
    get: '/article',
    add: '/article/new',
    delete: '/article/',
    update: '/article/',
    recent: '/article/publish/recent'
  }

  constructor() {
    super()
  }

  async addArticle(userId, article) {
    const req = {
      url: this.api.add,
      method: 'POST',
      data: { author: userId, ...article }
    }

    try {
      const res = await this.http(req)
      return `发表文章成功`
    } catch (err) {
      throw new Error(err)
    }
  }

  async fetchRecentPublishedArticle() {
    const req = {
      url: this.api.recent,
      method: 'GET',
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  async fetchArticles(query, userId) {
    query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

    const req = {
      url: this.api.get,
      method: 'GET',
    }

    req.url += '?'+ query + '&userId=' + userId

    try {
      const res = await this.http(req)
      return {
        items: res.data.items,
        total: res.data.total
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async fetchArticle(id) {
    const req = { url: this.api.get + '/' + id, method: 'get' }
    try {
      const res = await this.http(req)
      return res.data.article
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteArticle(id, userId) {
    const req = { 
      url: this.api.delete + id, 
      method: 'delete',
      data: { userId } 
    }

    try {
      const res = await this.http(req)
      return res.message
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateArticle(article, articleId, userId) {
    const req = {
      url: this.api.update + articleId,
      method: 'PATCH',
      data: {
        ...article,
        userId
      }
    }

    try {
      const res = await this.http(req)
      return `更新文章成功`
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const ArticleProvider = new _ArticleProvider()
