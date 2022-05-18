/* eslint-env es6 */
const { config } = require('@wipi/config');

module.exports = {
  siteUrl: config.CLIENT_SITE_URL,
  generateRobotsTxt: true,
};
