module.exports = {
  port: 3000,
  mongodb: {
    name: 'elapse',
    host: '127.0.0.1',
    port: 27017,
    user: 'zx',
    pwd:  'zx123'
  },
  mailer: {

  },
  encrypt: {
    salt: '',
  },
  token: {
    secret: 'elapse',
    expires: '4h',
    unlesses: [/^\/api\/v1\/user/, /^\/api\/v1\/article/]
  },
  router: {
    prefix: '/api/v1/'
  },
}
