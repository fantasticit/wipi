const article = require('./article');
const user = require('./user');

module.exports = app => ({
  article: article(app),
  user: user(app),
})
