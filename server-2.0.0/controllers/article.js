const withActions = require('./common-actions');

module.exports = app => {
  const model = app.model['article']

  const ArticleController = withActions(model)({})

  ArticleController.create = async ctx => {
    try {
      const req = ctx.request.body;
      const { html, toc } = app.service.marked(req.content)
      const result = await model.create({...req, html, toc, createAt: Date.now()})
      return ctx.body = result;
    } catch (err) {
      ctx.body = err;
      throw new Error(err);
    }
  }

  // 更新文章
  ArticleController.updateById = async ctx => {
    try {
      const { id } = ctx.params
      const req = ctx.request.body
      const userId = req.userId || ''
      const targetArticle = await model.findById(id)

      if (
        !userId
        || targetArticle.author != userId
      ) {
        ctx.throw(400, { message: '非文章作者' })
      }

      const result = await model.findByIdAndUpdate(ctx.params.id, {
        ...req,
        updatedDate: Date.now()
      }).exec();

      return ctx.body = result;
    } catch (err) {
      ctx.body = err;
      throw new Error(err);
    }
  }

  return ArticleController
}
