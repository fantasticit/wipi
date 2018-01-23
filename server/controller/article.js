const ArticleModel = require('../models/article')

module.exports = {
  add: async (ctx, next) => {
    const {
      title,
      author,
      desc,
      classify,
      tags,
      content_md,
      content_html,
    } = req = ctx.request.body

    let flag = true
    Object.keys(req).forEach(key => {
      if (!!!req[key]) {
        flag = false
        ctx.send({ status: 'no', message: `键${key}, ${req[key]}值不通过` })
      }
    })

    if (!flag) {
      console.log('接收到错误的参数')
      return
    }

    try {
      const date = Date.now()
      const result = await ArticleModel.create({
        title,
        author,
        desc,
        date,
        classify,
        tags,
        content_md,
        content_html,
      })

      if (result !== null) {
        ctx.send({ status: 'ok', message: '新增文章成功' })
      } else {
        ctx.send({ status: 'no', message: '新增文章失败' })
      }
    } catch (err) {
      console.log(err)
    }
  },

  get: async (ctx, next) => {
    try {
      const data = await ArticleModel.find()
      ctx.send({ status: 'ok', message: '新增文章成功', data })
    } catch (err) {
      console.log(err)
    }
  }
}
