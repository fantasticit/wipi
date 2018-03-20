const filter = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g') // 过滤敏感字

/**
 * 为controller添加通用的方法
 * @param {*} model 
 */
module.exports = model => (controller = {}) => {
  const actions = {
    create: async (ctx) => {
      try {
        const result = await model.create(ctx.request.body)
        ctx.status = 201
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },

    findAll: async (ctx) => {
      try {
        let query = ctx.request.query;
        // 条件查询
        let conditions = {};
        query.conditions && (conditions = JSON.parse(query.conditions));

        // 分页查询
        let { page = 1, pageSize = 20, keyword = '' } = ctx.request.query;
        page = +page;
        pageSize = +pageSize;
        const skip = page === 0 ? 0 : (page - 1) * pageSize;

        // 关键字查询
        if (!!keyword) {
          keyword = keyword.replace(filter, '');
          const reg = new RegExp(keyword, 'i');
          conditions.$or = [
            { title: { $regex: reg }},
            { desc: { $regex: reg }},
          ];
        }

        let builder = model.find(conditions).limit(pageSize).skip(skip);
        
        ['sort', 'select'].forEach(key => {
          if (query[key]) {
            builder[key](JSON.parse(query[key]));
          }
        });
        
        // 展开字段
        let embedded = query.embedded && JSON.parse(query.embedded)

        if (embedded) {
          Object.keys(embedded).forEach(key => {
            builder.populate(key)
          })
        }

        const result = await builder.exec();
        const total = await builder.count();
        return ctx.body = { status: 'ok', data: result, total }
      } catch (err) {
        return ctx.body = err
      }
    },

    findById: async (ctx) => {
      try {
        let query = ctx.request.query;
        let builder = model.findById(ctx.params.id);
        ['sort', 'select'].forEach(key => {
          if (query[key]) {
            builder[key](JSON.parse(query[key]));
          }
        });

        let embedded = query.embedded && JSON.parse(query.embedded)

        if (embedded) {
          Object.keys(embedded).forEach(key => {
            builder.populate(key)
          })
        }

        const result = await builder.exec();
        return ctx.body = { status: 'ok', data: result }
      } catch (err) {
        return ctx.body = err
      }
    },

    updateById: async (ctx) => {
      try {
        await model.update({_id: ctx.params.id}, {
          ...ctx.request.body,
          updateAt: Date.now() 
        });
        const result = await model.findById(id);

        return ctx.body = result;
      } catch (err) {
        return ctx.body = err
      }
    },

    replaceById: async (ctx) => {
      try {
        await model.findByIdAndRemove(ctx.params.id).exec();
        const newDocument = ctx.request.body;
        newDocument._id = ctx.params.id;
        const result = await model.create(newDocument)

        return ctx.body = result;
      } catch (err) {
        return ctx.body = err
      }
    },

    deleteById: async (ctx) => {
      try {
        const result = await model.findByIdAndRemove(ctx.params.id).exec();
   
        return ctx.body = result;
      } catch (err) {
        return ctx.body = err
      }
    }
  };

  Object.keys(actions).forEach(key => controller[key] = actions[key])

  return controller
}
