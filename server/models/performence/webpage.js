const mongoose = require('mongoose')
const Schema = mongoose.Schema

const webpageSchema = new Schema({
  id: Number,
  appName: String,
  userAgent: String,
  clientIp: String,
  visitedDateTime: {
    type: Date,
    default: Date.now()
  },
  firstScreenTime: {
    type: Number,
    default: 0,
  },
  allLoadedTime: {
    type: Number,
    default: 0,
  },
  errMsg: String,
  errStack: String,
})

webpageSchema.index({ id: 1 })

const Webpage = mongoose.model('Webpage', webpageSchema)

module.exports = Webpage
