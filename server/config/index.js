const devConfig = require('./dev')
const prodConfig = require('./prod')

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
