const WebpagePerformenceModel = require('../../models/performence/webpage')

class WebpagePerformenceController {
  static constructor() {}

  static async addRecord(ctx) {
    let userAgent = ctx.request.header['user-agent']
    let { firstScreenTime, allLoadedTime, appName } = ctx.request.body
    firstScreenTime = +firstScreenTime
    allLoadedTime = +allLoadedTime

    const result = await WebpagePerformenceModel.create({
      appName,
      userAgent, 
      firstScreenTime, 
      allLoadedTime 
    }).catch(e => ctx.throw(500))
    ctx.send({ status: 'ok' })
  }

  static async getRecords(ctx, next) {
    const { appName } = ctx.query
    // 按时间降序查找最近的30条记录
    const result = await WebpagePerformenceModel.find({appName})
      .sort({visitDateTime:-1})
      .limit(30)    
      .catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '成功', data: {
        items: result,
      }
    })
  }
}

module.exports = WebpagePerformenceController




























// const FePerformence = require('../../models/fePeformence')

// class FePerformenceController {
//   static constructor() {}

//   static async addRecord(ctx, next) {
//     let userAgent = ctx.request.header['user-agent']
//     let clientIp = ctx.request.header['origin']
//     let { firstScreenTime, allLoadedTime, appName } = ctx.request.body
//     firstScreenTime = +firstScreenTime
//     allLoadedTime = +allLoadedTime

//     const result = await FePerformence.create({
//       appName,
//       userAgent, 
//       clientIp, 
//       firstScreenTime, 
//       allLoadedTime 
//     }).catch(e => ctx.throw(500))
//     ctx.send({ status: 'ok' })
//   }

//   static async getRecords(ctx, next) {
//     const { appName } = ctx.query
//     // 按时间降序查找最近的30条记录
//     const result = await FePerformence.find({appName})
//       .sort({visitDateTime:-1})
//       .limit(30)    
//       .catch(e => ctx.throw(500))
//     ctx.send({ status: 'ok', message: '成功', data: {
//         items: result,
//       }
//     })
//   }

//   static async getPerformenceStatics(ctx, next) {
//     const pv = await FePerformence.find().count().catch(e => ctx.throw(500))
//     ctx.send({ status: 'ok', message: '成功', data: {
//         pv,
//       }
//     })
//   }
// }

// module.exports = WebpagePerformenceModel
