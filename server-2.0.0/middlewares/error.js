module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log('中间件捕捉到错误');
    console.log(err)
  }
}