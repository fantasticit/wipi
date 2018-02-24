const WebpageErrorModel = require('../../models/error/webpage')
const filter = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g') // 过滤敏感字符

class WebpageErrorController {
  static constructor() {}

  // 记录错误
  static async addRecord(ctx, next) {
    let { errMsg, errStack, vm, info, appName } = ctx.request.body

    await WebpageErrorModel.create({ errMsg, errStack, vm, info, appName })
      .catch(e => ctx.throw(500))
    
    ctx.send({ status: 'ok', message: '成功' })
  }

  static async getRecords(ctx, next) {
    let { appName, keyword, page = 1, pageSize = 20 } = ctx.query
    page = +page
    pageSize = +pageSize
    const skip = page === 0 ? 0 : (page - 1) * pageSize
    const query = { appName }

    // 关键字查询(模糊查询)
    if (!!keyword && keyword !== 'undefined' && keyword !== 'null') {
      keyword = keyword.replace(filter, '')
      const reg = new RegExp(keyword, 'i')
      query.$or = [
        { vm: { $regex: reg }},
      ]
    }

    const records = await WebpageErrorModel
      .find(query)
      .limit(pageSize)
      .skip(skip)
      .catch(e => ctx.throw(500))
    
    const total = await WebpageErrorModel
      .find(query)
      .count()
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '成功', data: { items: records, total } })
  }
}

module.exports = WebpageErrorController
