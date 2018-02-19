const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  account: String,                   // 账户
  passwd: String,                    // 密码
  avatar: {                          // 头像
    type: String,
    default: 'http://p39p1kvxn.bkt.clouddn.com/'
              + 'FrgZ2d6bbj7Th1w3m7lD7cCLBcBj'
  },
  roles: {                           // 角色（默认user）
    type: Array,
    default: ['user']
  },
  lastLoginTime: {                   // 上次登录时间
    type: Date,
    default: Date.now()
  },
  createdTime: {                      // 注册日期
    type: Date,
    default: Date.now()
  },
})

userSchema.index({ id: 1 })

const User = mongoose.model('User', userSchema)

module.exports = User
