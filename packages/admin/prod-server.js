const { config } = require('@wipi/config');
const cli = require('next/dist/cli/next-start');

const port = config.ADMIN_PORT || 3002;

try {
  cli.nextStart(['-p', port]);
  console.log(`[wipi] 管理端已启动，端口：${port}`);
} catch (err) {
  console.log(`[wipi] 管理端启动失败！${err.message || err}`);
}
