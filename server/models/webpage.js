const mongoose = require('mongoose')
const Schema = mongoose.Schema

const webpageSchema = new Schema({
  id: Number,
  ip: String,
  vm: String,
  info: String,
  errMsg: String,
  errStack: String,
  appName: String,
  userAgent: String,
  dateTime: {
    type: Date,
    default: Date.now()
  },
  allLoadedTime: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
})

webpageSchema.index({ id: 1 })

const Webpage = mongoose.model('Webpage', webpageSchema)

module.exports = Webpage

// ip查询
// var geoip2 = require('geoip2');
// geoip2.init();
// geoip2.lookupSimple("58.19.42.219", function(error, result) {
//   if (error) {
//     console.log("Error: %s", error);
//   }
//   else if (result) {
//     console.log(result);
//   }
// });