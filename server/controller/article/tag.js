const TagModel = require('../../models/article/tag')

class TagController {
  static constructor() {}

  static async addTag(ctx) {
    const { title, value } = ctx.request.body

    await TagModel.create({ title, value }).catch(e => {
      if (e.code === 11000) {
        ctx.throw(400, { message: '标签已存在' })
      } else {
        ctx.throw(500)
      }
    })

    ctx.send({ code: 'ok' })
  }

  static async getTags(ctx) {
    const tags = await TagModel.find().catch(e => ctx.throw(500))
    const total = await TagModel.find().count().catch(e => ctx.throw(500))

    ctx.send({ code: 'ok', data: {items: tags, total}})
  }
}

module.exports = TagController
