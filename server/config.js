const config = {
  dev: {
    port: 3000,

    db: {
      name: 'coding-heart',
      host: '127.0.0.1',
      port: 27017,
      user: 'zx',
      pwd:  'zx123',
    },
  },

  prod: {

  }
}

module.exports = config[process.env.NODE_ENV]
