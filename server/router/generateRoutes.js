module.exports = (app, router) => {
  const prefix = app.config.router.prefix;

  Object.keys(app.controller).forEach(key => {
    if (!app.model[key]) {
      console.info(`未找到与 ${key} Controller 对应的 ${key} Model（这并不影响项目的运行）`)
    } else {
      const modelUrl = `/${key}`;
      const itemUrl = `/${key}/:id`;
      const controller = app.controller[key];

      controller.findAll && router.get(modelUrl, controller.findAll);
      controller.create && router.post(modelUrl, controller.create);
      controller.findById && router.get(itemUrl, controller.findById);
      controller.deleteById && router.delete(itemUrl, controller.deleteById);
      controller.replaceById && router.put(itemUrl, controller.replaceById);
      controller.updateById && router.patch(itemUrl, controller.updateById);
    }
  })
};
