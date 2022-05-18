/* eslint-env es6 */
const { config } = require('@wipi/config');
const cli = require('next/dist/cli/next-dev');

try {
  cli.nextDev(['-p', config.ADMIN_PORT || 3002]);
  console.log(`[think] 管理端已启动，端口：${config.ADMIN_PORT || 3002}`);
} catch (err) {
  console.log(`[think] 管理端启动失败！${err.message || err}`);
}
