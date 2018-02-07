const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: Number,
  title: String,
  desc: String,
  cover: String,
  author: String,
  createDate: Date,
  classify: String,
  tags: Array,
  content_md: String,
  content_html: String,
  state: String,
})

articleSchema.index({ id: 1 })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
