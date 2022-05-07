/* eslint-env es6 */
const { config } = require('@wipi/config');
const cli = require('next/dist/cli/next-start');

try {
  cli.nextStart(['-p', config.CLIENT_PORT || 3001]);
  console.log(`[think] 客户端已启动，端口：${config.CLIENT_PORT || 3002}`);
} catch (err) {
  console.log(`[think] 客户端启动失败！${err.message || err}`);
}
