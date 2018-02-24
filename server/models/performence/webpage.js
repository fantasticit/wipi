const mongoose = require('mongoose')
const Schema = mongoose.Schema

const webpageSchema = new Schema({
  id: Number,
  appName: String,
  userAgent: String,
  firstScreenTime: {
    type: Number,
    default: 0,
  },
  allLoadedTime: {
    type: Number,
    default: 0,
  },
  createdDateTime: {
    type: Date,
    default: Date.now()
  },
})

webpageSchema.index({ id: 1 })

const Webpage = mongoose.model('Performence_Webpage', webpageSchema)

module.exports = Webpage
