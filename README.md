<h1>Wipi</h1>

前后端分离，服务端渲染的博客系统。支持特性：

- 文章创建、编辑、发布
- 文章及页面评论
- 文章搜索及搜索记录管理
- 页面动态创建
- 文件上传（上传到 阿里云 OSS）
- 邮件通知
- 动态系统设置（系统标题、Logo、favicon、页脚及 SEO 配置等）
- 系统访问统计（ip + user-agent）

使用技术：`react.js`、 `typescript`、 `nextjs`、 `nestjs`、 `mysql`。

## 线上预览

<ul>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2020-05-30/wipi_home_dark.png)" alt="首页" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2020-05-30/wipi_article_dark.png" alt="文章" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2020-05-30/wipi_article_needpasswd.png" alt="文章加密" /></li>
  <li><img width="240" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2020-05-30/wipi_admin.png" alt="后台" /></li>
</ul>

### 前台页面

地址：https://blog.wipi.tech/

### 后台页面

地址：https://admin.blog.wipi.tech/ （支持访客注册，也可使用账户：`wipi` `wipi123456`）。

## 本地启动

- 安装依赖

首先安装 `MySQL`，推荐使用 docker 进行安装。

```bash
docker run -d --restart=always --name wipi-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql
```

- clone 本项目。

```bash
git clone --depth=1 https://github.com/zhxuc/wipi.git your-project-name
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

在服务器使用 pm2 进行部署即可，可以查看 `deploy.sh` 文件。`nginx` 配置可根据需要自定义。
