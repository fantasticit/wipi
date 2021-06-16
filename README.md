# Wipi

## 简介

Wipi 是一个面向个人的开源的集成文章发表、页面创建、知识小册等功能的 CMS 系统。涉及到的技术如下：

- `MySQL`：数据存储
- `next.js`：前端页面框架
- `nest.js`：服务端框架
- `AliyunOSS`：对象存储

## 链接

- [Github 源码](https://github.com/fantasticit/wipi)
- [前台页面](https://blog.wipi.tech/)
- [管理系统](https://admin.blog.wipi.tech/)：支持访客注册
- [接口文档](https://api.blog.wipi.tech/api/)

## 功能点

- 文章管理
- 页面管理
- 知识小册
- 评论管理
- 邮件管理
- 访问统计
- 文件管理
- 系统设置

更多功能，欢迎访问系统进行体验。

## 预览

<ul>
  <li><img width="240" alt="文章列表" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-13/3402/image.png"/></li>
  <li><img width="240" alt="文章详情" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-12/815/image.png"/></li>
  <li><img width="240" alt="动态页面" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-12/3124/image.png"/></li>
  <li><img width="240" alt="知识小册" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-12/6485/image.png"/></li>
  <li><img width="240" alt="后台管理" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-12/754/image.png"/></li>
  <li><img width="240" alt="文章编辑" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-12/6587/image.png"/></li>
  <li><img width="240" alt="小册编辑" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-12/1864/image.png"/></li>
</ul>

## 项目运行

### 数据库

首先安装 `MySQL`，推荐使用 docker 进行安装。

```bash
docker image pull mysql:5.7
docker run -d --restart=always --name wipi -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

然后在 `MySQL` 中创建数据库。

```bash
docker container exec -it wipi bash;
mysql -u root -p;
CREATE DATABASE  `wipi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 本地运行

首先，clone 项目。

```bash
git clone --depth=1 https://github.com/fantasticit/wipi.git your-project-name
```

然后，安装项目依赖。

```bash
yarn
```

- 启动项目

```bash
yarn dev
```

前台页面地址：`http://localhost:3000`。
后台管理地址：`http://localhost:3001`。
服务接口地址：`http://localhost:4000`。

首次启动，默认创建管理员用户：admin，密码：admin（可在 `.env` 文件中进行修改）。
[PS] 如服务端配置启动失败，请先确认 MySQL 的配置是否正确，配置文件在 `.env`。在生产环境中需要在后台正确设置系统的地址，否则二维码无法正确识别。本地开发环境中，如未填域名地址，默认为空。

### 系统设置

<ul>
  <li><img width="240" alt="系统设置" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-13/FURY8457EB0K41T6ABMBCSP1N9HUUFAB/image.png"/></li>
  <li><img width="240" alt="前台页面" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-06-13/ICS41W05E4XRKLEAF9YO99A48CWGRP9X/image.png"/></li>
</ul>

项目初次启动时，需要在后台进行系统设置。随着内容的丰富，页面内容也会丰富起来。

### 配置文件

默认加载 `.env` 文件，生产环境会尝试加载 `.env.prod` 文件。

```bash
CLIENT_ASSET_PREFIX=/ # client 打包前缀地址（类似 webpack publicPath 配置）
ADMIN_ASSET_PREFIX=/ # admin 打包前缀地址
SERVER_API_URL=http://localhost:4000/api # 接口地址

ADMIN_USER=admin # 默认管理员账户
ADMIN_PASSWD=admin # 默认管理员密码
DB_HOST=127.0.0.1 # 数据库地址
DB_PORT=3306 # 数据库端口
DB_USER=root # 数据库用户名
DB_PASSWD=root # 数据库密码
DB_DATABASE=wipi # 数据库名称
```

### 项目部署

生产环境部署的脚本如下：

```bash

node -v
npm -v

npm config set registry http://registry.npmjs.org

npm i -g pm2 @nestjs/cli yarn

yarn
yarn run build
yarn run pm2

pm2 startup
pm2 save
```

### nginx 配置

采用反向代理进行 `nginx` 配置，**同时设置 `proxy_set_header X-Real-IP $remote_addr;` 以便服务端获取到真实 ip 地址**。

```bash
upstream wipi_client {
  server 127.0.0.1:3000;
  keepalive 64;
}

# http -> https 重定向
server {
  listen  80;
  server_name 域名;
  rewrite ^(.*)$  https://$host$1 permanent;
}

server {
  listen 443 ssl;
  server_name 域名;
  ssl_certificate      证书存放路径;
  ssl_certificate_key  证书存放路径;

  location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_cache_bypass $http_upgrade;
    proxy_pass http://wipi_client; #反向代理
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## 资料

- next.js 源码：https://github.com/vercel/next.js
- next.js 文档：https://nextjs.org/
- nest.js 源码：https://github.com/nestjs/nest
- nest.js 文档：https://nestjs.com/
