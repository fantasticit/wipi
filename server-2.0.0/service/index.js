const createEncrypt = require('./encrypt');
const isAdmin = require('./is-admin');

module.exports = config => {
  return {
    encrypt: createEncrypt(config),
    isAdmin,
  };
}
