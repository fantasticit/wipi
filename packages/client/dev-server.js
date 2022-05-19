const { config } = require('@wipi/config');
const cli = require('next/dist/cli/next-dev');

const port = config.CLIENT_PORT || 3001;

try {
  cli.nextDev(['-p', port]);
  console.log(`[wipi] 客户端已启动，端口：${port}`);
} catch (err) {
  console.log(`[wipi] 客户端启动失败！${err.message || err}`);
}
