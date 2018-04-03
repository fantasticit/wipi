module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;

    ctx.body = {
      message: ctx.status === 401 ? '鉴权失败，请检查token' : err.message
    };
  }
}