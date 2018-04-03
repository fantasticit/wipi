import axios from './config'

class ArticlerService {
  static constructor() {}

  static async fetchArticles({ tag, classify, keyword }) {
    const req = { 
      url: `/article?embedded={"author": 1,"classify":1,"tags": 1}&sort={"createAt": -1}`, 
      method: 'get' 
    }

    const conditions = { state: "publish" };
    tag && (conditions.tags = {"$in": [`${tag}`]});
    classify && (conditions.classify = classify);
    keyword && (conditions.keyword = keyword);

    req.url += `&conditions=${JSON.stringify(conditions)}`
  
    try {
      const res = await axios(req)
      console.log(res)
      return res && res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  static async fetchArticleById(id) {
    const req = {
      url: `/article/${id}?conditions={"state":"publish"}&embedded={"author": 1,"classify":1,"tags": 1}`,
      method: 'get'
    };

    try {
      const res = await axios(req)

      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 最新文章
  static async fetchRecentArticles() {
    const req = { 
      url: `/article?conditions={"state":"publish"}&page=1&pageSize=10&sort={"createAt": -1}`, 
      method: 'get' 
    }

    try {
      const res = await axios(req)
      return res && res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 更新文章
  static async updateArticle(id, data) {
    const req = {
      url: `/article/${id}`,
      method: 'patch',
      data
    }

    // 只需要发出请求
    await axios(req)
  }

  // 获取文章分类及相应文章数目
  static async fetchArticleClassifies(id, data) {
    const req = {
      url: `/article/classifyStats`,
      method: 'get'
    }

    try {
      // 只需要发出请求
      const res = await axios(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default ArticlerService
