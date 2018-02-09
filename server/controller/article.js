const ArticleModel = require('../models/article')
const filter = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g') // 过滤敏感字符

function checkArticle(article, skips, ctx) {
  Object.keys(article).forEach(key => {
    if (skips.indexOf(key) == -1 && !Boolean(article[key])) {
      // 非跳过字段且该字段键值为空
      ctx.throw(400, { status: 'no', message: `键${key}, ${req[key]}值不通过` })
    }
    // } else {
    //   // 过滤敏感字符
    //   if (key !== 'content_md' || key !== 'content_html') {
    //     article[key] = article[key].replace(filter, '')
    //   }
    // }
  })
}

module.exports = {
  add: async (ctx, next) => {
    const req = ctx.request.body
    checkArticle(req, ['cover'], ctx)
    const createDate = Date.now()
    const result = await ArticleModel.create({...req, createDate}).catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '新增文章成功' })
  },

  get: async (ctx, next) => {
    let { classify, state, keyword, page, pageSize } = ctx.query
    // 转为Number类型
    page = +page
    pageSize = +pageSize
  
    // 查询条件
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
    // 分页查询
    const skip = page === 0 ? 0 : (page - 1) * pageSize
    // 文章
    const articles = await ArticleModel
                            .find(query)
                            .limit(pageSize)
                            .skip(skip)
                            .catch(e => ctx.throw(500))
    // 文章总数目
    const total = await ArticleModel.find(query).count().catch(e => ctx.throw(500))

    ctx.send({ status: 'ok', message: '获取文章成功', data: {
      items: articles,
      total
    }})
  },

  getById: async (ctx, next) => {
    const { id } = ctx.params
    const article = await ArticleModel.findById(id).catch(e => ctx.throw(500))
    
    if(!article) {
      ctx.send({ status: 'no', message: '该ID下暂无文章'})
    } else {
      ctx.send({ status: 'ok', message: '获取文章成功', data: { article }})
    }
  },

  update: async (ctx, next) => {
    const { id } = ctx.params
    const req = ctx.request.body
    checkArticle(req, ['cover'], ctx)

    const createDate = Date.now()
    const result = await ArticleModel.findByIdAndUpdate(id, {...req, createDate})
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '更新文章成功' })
  },

  delete: async (ctx, next) => {
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
  },
}


class ArticleController {
  async addArticle(ctx, next) {
    const req = ctx.request.body
    checkArticle(req, ['cover'], ctx)
    const createDate = Date.now()
    const result = await ArticleModel.create({...req, createDate})
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '新增文章成功' })
  }

  async getArticle(ctx, next) {
    let { classify, state, keyword, page, pageSize } = ctx.query
    // 转为Number类型
    page = +page
    pageSize = +pageSize
  
    // 查询条件
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
    // 分页查询
    const skip = page === 0 ? 0 : (page - 1) * pageSize
    // 文章
    const articles = await ArticleModel
                            .find(query)
                            .limit(pageSize)
                            .skip(skip)
                            .catch(e => ctx.throw(500))
    // 文章总数目
    const total = await ArticleModel.find(query).count().catch(e => ctx.throw(500))

    ctx.send({ status: 'ok', message: '获取文章成功', data: {
      items: articles,
      total
    }})
  }

  async getArticleById(ctx, next) {
    const { id } = ctx.params
    const article = await ArticleModel.findById(id).catch(e => ctx.throw(500))
    
    if(!article) {
      ctx.send({ status: 'no', message: '该ID下暂无文章'})
    } else {
      ctx.send({ status: 'ok', message: '获取文章成功', data: { article }})
    }
  }

  async updateArticle(ctx, next) {
    const { id } = ctx.params
    const req = ctx.request.body
    checkArticle(req, ['cover'], ctx)

    const createDate = Date.now()
    const result = await ArticleModel.findByIdAndUpdate(id, {...req, createDate})
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '更新文章成功' })
  }

  async deleteArticle(ctx, next) {
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
