# Wipi

## 简介

本项目使用 `next.js`、`nest.js` 和 `MySQL` 从 0 到 1 搭建了一个完整的前后端分离项目。其中，使用 `next.js` 通过服务端渲染前台页面和后台管理系统，使用 `nest.js` 提供了 `restful api` 接口，使用 `typeorm` 操作 `MySQL` 数据。

## 链接

- [Github 源码](https://github.com/fantasticit/wipi)
- [前台页面](https://blog.wipi.tech/)
- [管理系统](https://admin.blog.wipi.tech/)：支持访客注册，也可使用账户：`wipi` `wipi123456`

## 功能点

- 文章创建、发布、更新，以及相应标签、分类管理
- 文章搜索
- 页面创建、发布、更新
- 评论管理
- 邮件通知
- 系统访问统计（ip + user-agent）
- 用户管理（管理员、访客）
- 文件上传（上传到 阿里 OSS）
- 动态 SEO、标题、Logo、favicon 等设置
- 使用 vscode 的 `monaco` 作为文章、页面的编辑器，支持 `Markdown` 语法

更多功能，欢迎访问系统进行体验。

## 预览

<ul>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-client-home.png" alt="前台首页" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-client-article.png" alt="前台文章" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-client-search.png" alt="前台搜索" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-clinet-archives.png" alt="前台归档" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-admin-home.png" alt="后台首页" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-admin-setting.png" alt="后台设置" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-admin-article.png" alt="后台文章管理" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-admin-editor.png" alt="后台编辑器" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-21/wipi-admin-comment.png" alt="后台评论管理" /></li>
</ul>

## 本地启动

- 安装依赖

首先安装 `MySQL`，推荐使用 docker 进行安装。

```bash
docker run -d --restart=always --name wipi -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

然后在 `MySQL` 中创建数据库。

```bash
docker container exec -it wipi  bash;
mysql -u root -p root;
CREATE DATABASE  `wipi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- clone 本项目。

```bash
git clone --depth=1 https://github.com/fantasticit/wipi.git your-project-name
```

然后安装项目 node 依赖。

```bash
lerna bootstrap
```

- 启动项目

```bash
lerna run dev
```

前台页面地址：`http://localhost:3000`。
后台管理地址：`http://localhost:3001`。
服务接口地址：`http://localhost:4000`。

首次启动，默认创建管理员用户：admin，密码：admin（可在 `server/src/config` 文件中进行修改）。
[PS] 如服务端配置启动失败，请先确认 MySQL 的配置是否正确，配置文件在 `server/src/config`。

## 项目部署

在服务器使用 pm2 进行部署即可，可以查看 `deploy.sh` 文件。具体内容如下：

```bash

node -v
npm -v

npm config set registry http://registry.npmjs.org

npm install pm2 -g
npm i -g @nestjs/cli
npm i -g lerna

lerna bootstrap
lerna run build
lerna run pm2

pm2 startup
pm2 save
```

## nginx 配置

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

遇到问题，善用搜索引擎。
