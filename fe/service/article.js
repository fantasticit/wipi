import axios from './config'

class ArticlerService {
  static constructor() {}

  static async fetchArticles(tag, keyword) {
    let query = ''

    if (keyword) {
      query = `keyword=${keyword}&state=publish`
    } else {
      query = `tag=${tag}&state=publish`
    }

    const req = { 
      url: `/article?${query}`, 
      method: 'get' 
    }

    try {
      const res = await axios(req)
      return res && res.data && res.data.items || []
    } catch (err) {
      throw new Error(err)
    }
  }

  static async fetchArticleById(id) {
    const req = { url: '/article' + '/' + id, method: 'get' }

    try {
      const res = await axios(req)

      return res.data.article
    } catch (err) {
      throw new Error(err)
    }
  }

  // 最新文章
  static async fetchRecentArticles() {
    const req = { 
      url: `/article/publish/recent`, 
      method: 'get' 
    }

    try {
      const res = await axios(req)
      return res && res.data && res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 更新文章阅读量
  static async updateArticleREadingQuantity(id) {
    const req = {
      url: `/article/readingQuantity/${id}`,
      method: 'patch',
    }

    // 只需要发出请求
    await axios(req)
  }

  // 获取文章标签
  static async fetchArticleTags() {
    const req = { url: '/article/tags', method: 'get' }

    try {
      const res = await axios(req)
      
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default ArticlerService
