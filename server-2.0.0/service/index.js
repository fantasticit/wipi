const createEncrypt = require('./encrypt');
const isAdmin = require('./is-admin');
const marked = require('./marked');

module.exports = config => {
  return {
    encrypt: createEncrypt(config),
    isAdmin,
    marked,
  };
}
