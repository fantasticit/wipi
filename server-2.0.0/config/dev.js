module.exports = {
  port: 3000,
  mongodb: {
    name: 'elapse',
    host: '127.0.0.1',
    port: 27017,
    user: 'zxx',
    pwd:  'zx123'
  },
  mailer: {

  },
  encrypt: {
    salt: '',
  },
  token: {
    secret: '',
    expires: ''
  },
  router: {
    prefix: '/api/v1'
  },
}
