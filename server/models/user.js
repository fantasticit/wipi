const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  account: String,
  password: String,
  roles: {
    type: Array,
    default: []
  },
  lastLoginTime: {
    type: Date,
    default: Date.now()
  },
  avatar: {
    type: String,
    default: 'http://p39p1kvxn.bkt.clouddn.com/FiziGBuQNJpp75oAOYtwLyru9Yph'
  },
})

userSchema.index({ id: 1 })

const User = mongoose.model('User', userSchema)

module.exports = User
