const article = require('./article');
const classify = require('./classify');
const tag = require('./tag');
const user = require('./user');

module.exports = app => ({
  article: article(app),
  classify: classify(app),
  tag: tag(app),
  user: user(app),
})
