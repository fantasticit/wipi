export const config = {
  juheApiKey: '', // 自动任务解析 ip 地址，依赖聚合数据的 key，请到 https://apis.juhe.cn/ip/ 申请 key 值
  admin: { name: 'admin', password: 'admin' },
  mysql: {
    host: '0.0.0.0',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'wipi',
    charset: 'utf8mb4',
    timezone: '+08:00',
  },
};
