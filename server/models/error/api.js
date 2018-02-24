const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiErrorSchema = new Schema({
  id: Number,
  statusCode: Number,
  requestUrl: String,
  method: String,
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

apiErrorSchema.index({ id: 1 })

const ApiError = mongoose.model('Error_Api', apiErrorSchema)

module.exports = ApiError
