import BaseHttp from '../base-http'

class _ArticleProvider extends BaseHttp {
  api = {
    get: '/article',
    add: '/article',
    delete: '/article/',
    update: '/article/',
    recent: '/article?page=1&pageSize=10&sort={"createAt": -1}'
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

  async fetchArticles(query, page, pageSize, userId) {
    const conditions = {}
    Object.keys(query).map(key => {
      query[key] && (conditions[key] = query[key])
    })

    const req = {
      url: this.api.get + 
            `?conditions=${JSON.stringify(conditions)}` + 
            `&page=${page}` + 
            `&pageSize=${pageSize}` + 
            `&embedded={"author": 1, "classify": 1, "tags": 1}`,
      method: 'GET',
    }

    try {
      const res = await this.http(req)
      return {
        items: res.data,
        total: res.total
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async fetchArticle(id) {
    const req = { url: this.api.get + '/' + id + '?embedded={"tags": 1}', method: 'get' }
    try {
      const res = await this.http(req)
      return res.data
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
      return '删除成功'
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

    console.log(req)

    try {
      const res = await this.http(req)
      return `更新文章成功`
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const ArticleProvider = new _ArticleProvider()
