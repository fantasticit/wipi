const withActions = require('./common-actions');

module.exports = app => {
  const model = app.model['tag']

  const TagController = withActions(model)({})

  return TagController
}
