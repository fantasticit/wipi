const ApiPerformenceModel = require('../../models/performence/api')
const filter = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g') // 过滤敏感字符

class ApiPerformenceController {
  static constructor() {}

  static async addRecord(data) {
    await ApiPerformenceModel.create(data).catch(e => ctx.throw(500))
  }

  // 获取接口调用记录
  static async getRecords(ctx, next) {
    const { requestUrl } = ctx.query
    const query = {}
    query.$or = [
      { requestUrl: { $regex: new RegExp(requestUrl, 'g') }},
    ]
    const data = await ApiPerformenceModel
      .find(query)
      .sort({dateTime:1})
      .limit(300) 
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '成功', data })
  }

  // 获取所有接口（即具体接口列表）
  static async getApiList(ctx) {
    const records = await ApiPerformenceModel.find().catch(e => ctx.throw(500))
    const apis = records.reduce((apis, item) => {
      let requestUrl = item.requestUrl.split('?')[0]
      
      if (apis.indexOf(requestUrl) === -1) {
        apis.push(requestUrl)
      }

      return apis
    }, [])

    ctx.send({ status: 'ok', message: '成功', data: apis })
  }

  // 获取各个接口的平均响应时间
  static async getApiAvarageResTime(ctx) {
    const data = {}
    const records = await ApiPerformenceModel
      .find().where('statusCode').lte(400).catch(e => ctx.throw(500))

    records.map(record => {
      const requestUrl = record.requestUrl.split('?')[0]

      if (!data[requestUrl]) {
        data[requestUrl] = []
      }

      data[requestUrl].push(record.responseTime)
    })

    Object.keys(data).forEach(key => {
      const total = data[key].reduce((total, num) => total += num, 0)
      data[key] = (total / data[key].length).toFixed(2)
    })

    ctx.send({ status: 'ok', message: '成功', data })
  }

  // 获取各个接口调用次数
  static async getApiCallTime(ctx) {
    const data = {}
    const records = await ApiPerformenceModel
      .find().where('statusCode').lte(400)
      .catch(e => ctx.throw(500))

    records.map(record => {
      const requestUrl = record.requestUrl.split('?')[0]

      if (!data[requestUrl]) {
        data[requestUrl] = 0
      }

      data[requestUrl] += 1
    })

    ctx.send({ status: 'ok', message: '成功', data })
  }
}

module.exports = ApiPerformenceController
