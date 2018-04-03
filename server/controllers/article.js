const withActions = require('./common-actions');

module.exports = app => {
  const model = app.model['article']

  const ArticleController = withActions(model)({})

  ArticleController.create = async ctx => {
    const req = ctx.request.body;
    const { html, toc } = app.service.marked(req.content)
    const result = await model.create({...req, html, toc, createAt: Date.now()})
    return ctx.body = result;
  }

  ArticleController.updateById = async ctx => {
    const req = ctx.request.body;
    const { html, toc } = app.service.marked(req.content)

    const result = await model.update({_id: ctx.params.id}, {
      ...req, html, toc, updateAt: Date.now()
    });
    return ctx.body = result;
  }

  // 更新文章
  ArticleController.updateById = async ctx => {
    const { id } = ctx.params;
    const req = ctx.request.body;
    const userId = req.userId || '';
    const targetArticle = await model.findById(id);

    // if (
    //   !userId
    //   || targetArticle.author != userId
    // ) {
    //   ctx.throw(400, { message: '非文章作者' })
    // }
    // delete req.userId;

    if (req.tags && (req.tags.length > 0)) {
      req.tags = [...req.tags].filter(Boolean)
    }

    if (req.content) {
      const { html, toc } = app.service.marked(req.content);
      req.html = html;
      req.toc = toc;
    }
    
    await model.update({_id: id}, {...req});
    const result = await model.findById(id);
    ctx.body = { status: 'ok', data: result };
  }

  ArticleController.getClassifyStats = async ctx => {
    let articles = await model.find().populate('classify');
    let data = {};

    articles.forEach(article => {
      if (!data[article.classify.title]) {
        data[article.classify.title] = {
          classify: article.classify,
          count: 0
        };
      }

      data[article.classify.title].count += 1;
    })

    ctx.body = { status: 'ok', data };
  }

  return ArticleController
}
