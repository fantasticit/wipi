const zlib = require('zlib');

module.exports = () => async (ctx, next) => {

  await next();

  let body = ctx.body;
  if (!body) {
    return
  }

  const acceptEncoding = ctx.request.headers['accept-encoding'];
  if (
    acceptEncoding &&
    acceptEncoding.indexOf('gzip') > -1
  ) {
    body = JSON.stringify(body)
    ctx.set('Content-Encoding', 'gzip');
    ctx.body = zlib.gzipSync(body)
  }
}