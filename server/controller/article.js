const ArticleModel = require('../models/article')

module.exports = {
  add: async (ctx, next) => {
    const {
      title,
      author,
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

    try {
      if (!flag) {
        throw new Error('接收到错误的参数')
      }

      const date = Date.now()
      const result = await ArticleModel.create({
        title,
        author,
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
}
