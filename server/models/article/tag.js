const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
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


tagSchema.index({ id: 1 })

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
