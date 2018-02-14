const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fePerformenceSchema = new Schema({
  id: Number,
  appName: String,
  userAgent: String,
  clientIp: String,
  visitDateTime: {
    type: Date,
    default: Date.now()
  },
  firstScreenTime: Number,
  allLoadedTime: Number,
})

fePerformenceSchema.index({ id: 1 })

const FePerformence = mongoose.model('FePerformence', fePerformenceSchema)

module.exports = FePerformence
