const ClassifyModel = require('../../models/article/classify')
const isAdmin = require('../util/is-admin')

class ClassifyController {
  static constructor() {}

  static async addClassify(ctx) {
    const { title, value, userId } = ctx.request.body

    if (!title || !value || !userId) {
      ctx.throw(400, { message: '分类键值不得为空' })
    }

    if (!await isAdmin(userId)) {
      ctx.throw(403, { message: '非管理员无法进行此操作' })
    }

    console.log(await isAdmin(userId))
 
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

  static async getClassify(ctx) {
    const { id } = ctx.params

    const classify = await ClassifyModel.findById(id).catch(e => ctx.throw(500))

    ctx.send({ code: 'ok', data: {classify}})
  }

  static async updateClassify(ctx) {
    const { id } = ctx.params
    let { title, value, userId } = ctx.request.body

    if (!await isAdmin(userId)) {
      ctx.throw(403, { message: '非管理员无法进行此操作' })
    }

    const updatedDate = Date.now()
    await ClassifyModel.findByIdAndUpdate(id, { title, value, updatedDate })
      .catch(e => ctx.throw(500))
    
    ctx.send({ code: 'ok', message: '更新成功' })
  }

  static async deleteClassify(ctx) {
    const { id } = ctx.params
    const { userId } = ctx.request.body

    if (!await isAdmin(userId)) {
      ctx.throw(403, { message: '非管理员无法进行此操作' })
    }

    await ClassifyModel.findByIdAndRemove(id).catch(e => ctx.throw(500))
    ctx.send({ code: 'ok', message: '删除成功' })
  }
}

module.exports = ClassifyController
