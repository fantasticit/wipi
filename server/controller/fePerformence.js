const FePerformence = require('../models/fePeformence')

// function getClientIp (req) {
//   let ip = req.header['x-forwarded-for']
//           || req.ip
//           || req.connection.remoteAddress
//           || req.socket.remoteAddress
//           || req.connection.socket.remoteAddress
//           || ''
  
//   if (ip.split(',').length > 0) {
//     ip = ip[0]
//   }

//   return ip
// }

class FePerformenceController {
  static constructor() {}

  static async addRecord(ctx, next) {
    let userAgent = ctx.request.header['user-agent']
    let clientIp = ctx.request.header['origin']
    let { firstScreenTime, allLoadedTime, appName } = ctx.request.body
    firstScreenTime = +firstScreenTime
    allLoadedTime = +allLoadedTime

    const result = await FePerformence.create({
      appName,
      userAgent, 
      clientIp, 
      firstScreenTime, 
      allLoadedTime 
    }).catch(e => ctx.throw(500))
    ctx.send({ status: 'ok' })
  }

  static async getRecords(ctx, next) {
    const result = await FePerformence.find().catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '成功', data: {
        items: result,
      }
    })
  }

  static async getPerformenceStatics(ctx, next) {
    const pv = await FePerformence.find().count().catch(e => ctx.throw(500))
    ctx.send({ status: 'ok', message: '成功', data: {
        pv,
      }
    })
  }
}

module.exports = FePerformenceController
