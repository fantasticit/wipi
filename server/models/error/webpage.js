const mongoose = require('mongoose')
const Schema = mongoose.Schema

const webpageSchema = new Schema({
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

webpageSchema.index({ id: 1 })

const Webpage = mongoose.model('Error_Webpage', webpageSchema)

module.exports = Webpage
