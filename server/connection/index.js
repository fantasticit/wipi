const mongodb = require('./mongodb')
const connect = { mongodb, }

module.exports = app => type => connect[type](app)
