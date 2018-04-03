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
  createAt: {                        // 创建日期
    type: Date,
    default: Date.now
  },
  updateAt: {                        // 更新日期
    type: Date,
    default: Date.now
  },
})

tagSchema.index({ id: 1 })
// 时间更新
tagSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { updateAt: Date.now() });
});

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
