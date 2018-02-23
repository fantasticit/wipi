const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiSchema = new Schema({
  id: Number,
  statusCode: Number,
  requestUrl: String,
  method: String,
  responseTime: Number,
  dateTime: {
    type: Date,
    default: Date.now
  },
  errMsg: String,
  errStack: String,
})

apiSchema.index({ id: 1 })

const Api = mongoose.model('Api', apiSchema)

module.exports = Api
