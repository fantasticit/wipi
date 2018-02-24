const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: Number,
  title: String,                        // 标题
  desc: String,                         // 描述
  cover: String,                        // 封面
  content: String,                      // 内容
  htmlContent: String,                  // HTML内容
  classify: String,                     // 分类
  tags: Array,                          // 标签
  state: {                              // 状态（‘草稿‘或者’发布‘）
    type: String,
    set: function (state) {
      return ['草稿', '发布'].indexOf(state) > -1
          ? state
          : '草稿'
    }
  },
  readingQuantity: {                    // 阅读量
    type: Number,
    default: 0,
  },
  createdDate: {                        // 创建日期
    type: Date,
    default: Date.now()
  },
  updatedDate: {                        // 更新日期
    type: Date,
    default: Date.now()
  },
  author: {                             // 作者
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  canPublish: {                         // 是否可以发布
    type: Boolean,
    default: false
  }
})


articleSchema.index({ id: 1 })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
