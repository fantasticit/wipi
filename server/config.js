const config = {
  dev: {
    port: 3000,

    db: {
      name: 'elapse',
      host: '127.0.0.1',
      port: 27017,
      user: 'zxx',
      pwd:  'zx123',
    },
    secret: 'elapse'
  },

  prod: {

  }
}

module.exports = config[process.env.NODE_ENV]
