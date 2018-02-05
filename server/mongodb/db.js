const mongoose = require('mongoose')
const config = require('../config').db

const url = `mongodb://${config.user}:${config.pwd}@${config.host}:${config.port}/${config.name}`

const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500
}

mongoose.connect(url, options)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => console.log('数据库连接成功'))

db.on('error', (err) => {
  console.error('Error in mongodb connection', err)
  mongoose.disconnect()
})

db.on('close', () => {
  console.log('数据库连接断开，重新连接中...')
  mongoose.connect(url, options)
})

module.exports = db
