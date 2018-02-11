const xssFilters = require('xss-filters')
const ArticleModel = require('../models/article')
const filter = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g') // 过滤敏感字符

class ArticleController {
  static constructor() {}

  // 检查并过滤字段
  // 首先进行非空检查，然后过滤字段
  // skips接受一个数组，用于指定不进行非空检查的字段
  static checkArticle(article, skips, ctx) {
    Object.keys(article).forEach(key => {
      if (skips.indexOf(key) == -1 && !Boolean(article[key])) {
        // 非跳过字段且该字段键值为空
        ctx.throw(400, { status: 'no', message: `键${key}, ${req[key]}值不通过` })
      }
      else {
        // 过滤敏感字符
        // if (key !== 'content_md' || key !== 'content_html') {
        //   article[key] = article[key].replace(filter, '')
        // }
        console.log(key + '-' + article[key])
        console.log(xssFilters.inHTMLData(article[key]))
      }
    })
  }

  // 新增文章
  static async addArticle(ctx, next) {
    const req = ctx.request.body
    ArticleController.checkArticle(req, ['cover'], ctx)
    const createDate = Date.now()
    const result = await ArticleModel.create({...req, createDate})
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '新增文章成功' })
  }

  // 根据query参数获取文章
  // 形式上更像是 listArticles
  static async getArticle(ctx, next) {
    let { classify, state, keyword, page = 1, pageSize = 20 } = ctx.query
    page = +page
    pageSize = +pageSize
    const query = {}
    !!classify && (query.classify = classify)
    !!state && (query.state = state)
    
    // 关键字查询(模糊查询)
    if (!!keyword) {
      keyword = keyword.replace(filter, '')
      const reg = new RegExp(keyword, 'i')
      query.$or = [
        { tags: { $regex: reg }},
        { title: { $regex: reg }},
        { desc: { $regex: reg }},
      ]
    }
    const skip = page === 0 ? 0 : (page - 1) * pageSize
    const articles = await ArticleModel.find(query).limit(pageSize).skip(skip)
      .catch(e => ctx.throw(500))
    const total = await ArticleModel.find(query).count().catch(e => ctx.throw(500))

    ctx.send({ status: 'ok', message: '获取文章成功', data: {
        items: articles,
        total
      }
    })
  }

  // 获取指定Id的文章
  static async getArticleById(ctx, next) {
    const { id } = ctx.params
    const article = await ArticleModel.findById(id).catch(e => ctx.throw(500))
    
    if(!article) {
      ctx.send({ status: 'no', message: '该ID下暂无文章'})
    } else {
      ctx.send({ status: 'ok', message: '获取文章成功', data: { article }})
    }
  }

  // 更新指定Id的文章
  static async updateArticle(ctx, next) {
    const { id } = ctx.params
    const req = ctx.request.body

    ArticleController.checkArticle(req, ['cover'], ctx)
    
    const updateDate = Date.now()
    const result = await ArticleModel.findByIdAndUpdate(id, {...req, updateDate})
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '更新文章成功' })
  }

  // 删除指定Id的文章
  static async deleteArticle(ctx, next) {
    const id = ctx.params.id
    const article = await ArticleModel.findByIdAndRemove(id)
      .catch(e => {
        if (e.name === 'CastError') {
          ctx.throw(400, { status: 'no', message: `文章不存在` })
        } else {
          ctx.throw(500)
        }
      })
    ctx.send({ status: 'ok', message: '删除文章成功'}) 
  }
}

module.exports = ArticleController
