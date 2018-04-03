const koaJwt = require('koa-jwt');

module.exports = app => {
  const secret = app.config.token.secret;
  const unlesses = app.config.token.unlesses || [];
  
  console.log(unlesses);
  return koaJwt({secret}).unless({path: unlesses})
}
