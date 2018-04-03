const article = require('./article');
const classify = require('./classify');
const qiniu = require('./qiniu');
const tag = require('./tag');
const user = require('./user');

module.exports = app => ({
  article: article(app),
  classify: classify(app),
  qiniu: qiniu(app),
  tag: tag(app),
  user: user(app),
})
