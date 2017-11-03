# clear-docs
自动根据gitLab项目生成文件索引的程序。
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
由于使用的是同域名共享cookie的权限验证方法，所以仿问域名必须跟gitLab一样才能生效。

GET /api/v3/projects?search=clear-docs&?simple=true
devData
生成左上方select;
sessionStore: id, path_with_namespace,
name_with_namespace
第二步:
GET /api/v3/projects/:currId/repository/tree?recursive=true
生成路由
第三步:
获取单个文件内容
GET /projects/:id/repository/files
GET /:path_with_namespace/raw/master/:file_path
