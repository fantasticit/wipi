# 安装与使用 mongodb

> 数据库使用`mongodb`。

## 安装与使用

### 1. 安装 mongodb

打开命令行键入`sudo apt-get install mongodb`。
安装完成后，在命令行输入`mongo -version`即可查看 mongodb 版本。

### 2. 启动与关闭 mongodb

默认 mongodb 是随 ubuntu 启动而启动的，可以输入`pgrep mongo -l`查看是否启动成功。
启动和关闭 mongodb 的命令如下：

```
service mongodb start
service mongodb stop
```

对 mongodb 进行操作前务必启动 mongodb，否则报错。

## 其他文档

- [跨域问题](./跨域问题.md)
- [日志中间件](./日志中间件.md)
- [jwt 签发与认证](docs/jwt签发与认证.md)
