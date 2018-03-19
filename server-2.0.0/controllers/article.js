const ObjectID = require("bson-objectid");
const withActions = require('./common-actions');

module.exports = app => {
  const model = app.model['article']

  const ArticleController = withActions(model)({})

  ArticleController.create = async ctx => {
    const req = ctx.request.body;
    console.log(req.tags)
    const { html, toc } = app.service.marked(req.content)
    const result = await model.create({...req, html, toc, createAt: Date.now()})
    return ctx.body = result;
  }

  // 更新文章
  ArticleController.updateById = async ctx => {
    const { id } = ctx.params;
    const req = ctx.request.body;

    // req.tags = [...JSON.parse(req.tags)].map(tag => new ObjectID(tag))
    
    const userId = req.userId || ''
    const targetArticle = await model.findById(id)

    if (
      !userId
      || targetArticle.author != userId
    ) {
      ctx.throw(400, { message: '非文章作者' })
    }
    delete req.userId
    console.log(req)
    const result = await model.findByIdAndUpdate(id, {...req}).catch(e => ctx.throw(500));
    ctx.body = { status: 'ok', data: result };
  }

  return ArticleController
}
