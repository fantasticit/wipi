const ArticleModel = require('../models/article')

module.exports = {
  add: async (ctx, next) => {
    const {
      title,
      author,
      cover,
      desc,
      classify,
      tags,
      content_md,
      content_html,
      states,
    } = req = ctx.request.body

    Object.keys(req).forEach(key => {
      if (!!!req[key]) {
        ctx.throw(400, { status: 'no', message: `键${key}, ${req[key]}值不通过` })
      }
    })

    const date = Date.now()
    const result = await ArticleModel.create({...req, date}).catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '新增文章成功' })
  },

  get: async (ctx, next) => {
    const { classify, state, keyword, page, pageSize } = ctx.query

    const query = {}
    !!classify && (query.classify = classify)
    !!state && (query.state = state)
    // 关键字查询(模糊查询)
    if (!!keyword) {
      const reg = new RegExp(keyword, 'i')
      query.$or = [
        { tags: { $regex: reg }},
        { title: { $regex: reg }},
        { desc: { $regex: reg }},
      ]
    }

    console.log(query)

    const skip = page === 0 ? 0 : (page - 1) * pageSize

    const articles = await ArticleModel
                            .find(query)
                            .limit(pageSize)
                            .skip(skip)
                            .catch(e => ctx.throw(500))

    const total = await ArticleModel.find().count().catch(e => ctx.throw(500))

    ctx.send({ status: 'ok', message: '获取文章成功', data: {
      items: articles,
      total
    }})
  }
}
