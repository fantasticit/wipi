const ArticleController = require('./article')
const ClassifyController = require('./classify')
const TagController = require('./tag')

module.exports = {
  article: ArticleController,
  classify: ClassifyController,
  tag: TagController
}
