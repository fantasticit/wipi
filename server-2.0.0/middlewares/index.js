const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const error = require('./error');
const gzip = require('./gzip');
const verify = require('./verify');

module.exports = app => {
  app.use(gzip());
  app.use(error());
  app.use(cors());
  app.use(verify(app));
  app.use(bodyParser());
}
