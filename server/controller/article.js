const ArticleModel = require('../models/article')
const filter = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g') // 过滤敏感字符

module.exports = {
  add: async (ctx, next) => {
    const req = ctx.request.body

    Object.keys(req).forEach(key => {
      if (!!!req[key]) {
        ctx.throw(400, { status: 'no', message: `键${key}, ${req[key]}值不通过` })
      }

      // req[key] = req[key].replace(filter, '')
    })

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

  delete: async (ctx, next) => {
    const id = ctx.params.id
    const article = await ArticleModel
                            .findByIdAndRemove(id)
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
