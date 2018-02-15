const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiPerformenceSchema = new Schema({
  id: Number,
  statusCode: Number,
  requestUrl: String,
  method: String,
  responseTime: Number,
  dateTime: {
    type: Date,
    default: Date.now()
  },
  errMsg: String,
  errStack: String,
})

apiPerformenceSchema.index({ id: 1 })

const ApiPerformence = mongoose.model('ApiPerformence', apiPerformenceSchema)

module.exports = ApiPerformence
