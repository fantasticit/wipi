const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiSchema = new Schema({
  id: Number,
  ip: String,
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
  isSendMail: {
    type: Boolean,
    default: false
  }
})

apiSchema.index({ id: 1 })

const Api = mongoose.model('Api', apiSchema)

module.exports = Api
