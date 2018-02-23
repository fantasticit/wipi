const ClassifyModel = require('../../models/article/classify')

class ClassifyController {
  static constructor() {}

  static async addClassify(ctx) {
    const { title, value } = ctx.request.body

    await ClassifyModel.create({ title, value }).catch(e => {
      if (e.code === 11000) {
        ctx.throw(400, { message: '分类已存在' })
      } else {
        ctx.throw(500)
      }
    })

    ctx.send({ code: 'ok' })
  }

  static async getClassifies(ctx) {
    const classifies = await ClassifyModel.find().catch(e => ctx.throw(500))
    const total = await ClassifyModel.find().count().catch(e => ctx.throw(500))

    ctx.send({ code: 'ok', data: {items: classifies, total}})
  }
}

module.exports = ClassifyController
