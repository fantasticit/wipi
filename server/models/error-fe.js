const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feErrorSchema = new Schema({
  id: Number,
  errMsg: String,
  errStack: String,
  vm: String,
  info: String,
  appName: String,
  dateTime: {
    type: Date,
    default: Date.now()
  },
})

feErrorSchema.index({ id: 1 })

const FeError = mongoose.model('FeError', feErrorSchema)

module.exports = FeError
