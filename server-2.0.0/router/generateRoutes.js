module.exports = (app, router) => {
  const prefix = app.config.router.prefix;

  Object.keys(app.controller).forEach(key => {
    if (!app.model[key]) {
      throw new Error(`未找到与 ${key} Controller 对应的 ${key} Model`)
    }

    const modelUrl = !!prefix ? `${prefix}/${key}` : `${key}`;
    const itemUrl = !!prefix ? `${prefix}/${key}/:id` : `${key}/:id`;
    const controller = app.controller[key];

    router.get(modelUrl, controller.findAll);
    router.post(modelUrl, controller.create);
    router.get(itemUrl, controller.findById);
    router.patch(itemUrl, controller.updateById);
    router.put(itemUrl, controller.replaceById);
    router.delete(itemUrl, controller.deleteById);
  })
};
