const withActions = require('./common-actions');

module.exports = app => {
  const model = app.model['classify']

  const ClassifyController = withActions(model)({})

  return ClassifyController
}
