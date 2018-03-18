const article = require('./article');

module.exports = app => ({
  article: article(app)
})
