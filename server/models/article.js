const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  id: Number,
  title: {                             // 标题
    type: String,
    required: true,
  },
  desc: String,                        // 描述
  cover: String,                       // 封面
  content: {                           // 内容
    type: String,
    required: true
  },
  html: String,                        // HTML内容
  toc: Array,                          // TOC
  classify: {                          // 分类
    type: Schema.Types.ObjectId,
    ref: 'Classify',
    required: true
  },
  tags: [{                              // 标签
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  state: {                             // 状态（‘草稿‘或者’发布‘）
    type: String,
    default: 'draft',
    set: function (state) {
      return ['draft', 'publish'].indexOf(state) > -1
          ? state
          : 'draft'
    }
  },
  readingQuantity: {                   // 阅读量
    type: Number,
    default: 0,
  },
  createAt: {                          // 创建日期
    type: Date,
    default: Date.now()
  },
  updateAt: {                          // 更新日期
    type: Date,
    default: Date.now()
  },
  author: {                            // 作者
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


articleSchema.index({ id: 1 });

// 时间更新
articleSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { updateAt: Date.now() });
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
