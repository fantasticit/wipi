const TagModel = require('../../models/article/tag')

class TagController {
  static constructor() {}

  static async addTag(ctx) {
    const { title, value } = ctx.request.body

    if (!title || !value) {
      ctx.throw(400, { message: '标签键值不得为空' })
    }

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

  static async getTag(ctx) {
    const { id } = ctx.params

    const tag = await TagModel.findById(id).catch(e => ctx.throw(500))

    ctx.send({ code: 'ok', data: {tag}})
  }

  static async updateTag(ctx) {
    const { id } = ctx.params
    let { title, value } = ctx.request.body
    const updatedDate = Date.now()
    await TagModel.findByIdAndUpdate(id, { title, value, updatedDate })
      .catch(e => ctx.throw(500))
    
    ctx.send({ code: 'ok', message: '更新成功' })
  }

  static async deleteTag(ctx) {
    const { id } = ctx.params
    await TagModel.findByIdAndRemove(id).catch(e => ctx.throw(500))
    ctx.send({ code: 'ok', message: '删除成功' })
  }
}

module.exports = TagController
