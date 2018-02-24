const ApiErrorModel = require('../../models/error/api')
const filter = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g') // 过滤敏感字符

class ApiErrorController {
  static constructor() {}

  static async addRecord(data) {
    await ApiErrorModel.create(data).catch(e => ctx.throw(500))
  }

  // 获取接口调用记录
  static async getRecords(ctx, next) {
    let { keyword, page = 1, pageSize = 20 } = ctx.query
    page = +page
    pageSize = +pageSize
    const query = {}
    
    // 关键字查询(模糊查询)
    if (!!keyword && keyword !== 'undefined' && keyword !== 'null') {
      keyword = keyword.replace(filter, '')
      const reg = new RegExp(keyword, 'i')
      query.$or = [
        { method: { $regex: reg }},
        { requestUrl: { $regex: reg }},
      ]
    }
    const skip = page === 0 ? 0 : (page - 1) * pageSize
  
    const records = await ApiErrorModel
      .find(query)
      .limit(pageSize)
      .skip(skip)
      .sort({ dataTime: 1 })
      .catch(e => {
        ctx.throw(500)
      })
    
    const total = await ApiErrorModel
      .find(query)
      .count()
      .catch(e => ctx.throw(500))

    ctx.send({ status: 'ok', message: '成功', data: { items: records, total } })
  }
}

module.exports = ApiErrorController
