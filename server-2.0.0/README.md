# Elapse Server
目前重构未完成。

## 1. 项目说明
本项目是`elapse`项目接口服务的2.0.0版本。
本次重构主要是重新组织定义了代码结构，力争一次重构是一次进步。

### 1.1 结构说明

```
├── app.js
├── config
│   ├── dev.js
│   ├── index.js
│   └── prod.js
├── connection
|   ├── redis.js
│   ├── index.js
│   └── mongodb.js
├── controllers
│   ├── actions.js
│   └── index.js
├── middlewares
│   └── index.js
├── models
│   └── index.js
├── router
│   ├── generateRoutes.js
│   └── index.js
├── service
└── node_modules  

```

其中：

- app.js 程序入口
- config 相关配置，配置将挂载到`app.config`
- connection 导出函数，主要用于连接数据库，可能需要读取`app.config`
- controllers 导出控制器函数将挂载到`app.controller`，同样可能需要读取`app.config`,其中`actions.js`将生成通用函数，可覆盖
- middlewares 导出中间件函数
- models: mongodb数据模型定义,将挂载到`app.model`
- router: 路由配置，其中`generateRoutes`将读取`app.model`和`app.controller`完成通用路由配置
- service: 服务代码（可以理解成`util`），将挂载到`app.service`

### 1.2 如何运行

```
# 开发模式
npm run dev

# 生产模式
npm run prod
```