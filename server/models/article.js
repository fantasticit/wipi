const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: Number,
  title: String,
  author: String,
  date: Date,
  classify: String,
  tags: Array,
  content_md: String,
  content_html: String,
})

articleSchema.index({ id: 1 })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
