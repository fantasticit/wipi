module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('中间件捕捉到错误');
    ctx.status = err.statusCode || err.status || 500;

    console.log(ctx.status)

    ctx.body = {
      message: ctx.status === 401 ? '鉴权失败，请检查token' : err.message
    };
  }
}