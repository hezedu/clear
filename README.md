# clear-docs
自动根据gitLab项目生成文件索引的程序。需要跟gitLab同域名才能生效。
## 安装
`npm install clear-docs`
## 启动服务

```js
var clearDocs = require('./index');
clearDocs({
  port: 4002, // 本服务listen 端口
  proxyPort: 10080  // gitLab 端口
});
```
