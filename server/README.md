# 服务端API接口开发
操作系统为`ubuntu 16.04 LTS`。

## 安装与使用mongodb
数据库使用`mongodb`。

### 1. 安装mongodb
打开命令行键入`sudo apt-get install mongodb`。
安装完成后，在命令行输入`mongo -version`即可查看mongodb版本。

### 2. 启动与关闭mongodb
默认mongodb是随ubuntu启动而启动的，可以输入`pgrep mongo -l`查看是否启动成功。
启动和关闭mongodb的命令如下：

```
service mongodb start
service mongodb stop
```

对mongodb进行操作前务必启动mongodb，否则报错。

## 跨域问题
为解决跨域问题,这里使用了`koa2-cors`,用法如下:

```
var koa = require('koa');
var cors = require('koa2-cors');

var app = koa();
app.use(cors());
```

## 日志中间件
待添加
