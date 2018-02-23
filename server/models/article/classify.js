const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classifySchema = new Schema({
  id: Number,
  title: {
    type: String,
    unique: true,
  },
  value: {
    type: String,
    unique: true,
  },
  createdDate: {                        // 创建日期
    type: Date,
    default: Date.now
  },
  updatedDate: {                        // 更新日期
    type: Date,
    default: Date.now
  },
})


classifySchema.index({ id: 1 })

const Classify = mongoose.model('Classify', classifySchema)

module.exports = Classify
