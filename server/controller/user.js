module.exports = {
  register: async (ctx, next) => {
    let { name, password } = ctx.request.body
    console.log({ name, password })
  }
}