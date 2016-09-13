# 构建命令
构建会根据config文件夹下配置build出不同的文件。

一般会build出两部分: 一部分只有一个index.html, 另一部分是打包好的文件,会在一个指定文件夹里。
### 测试环境
<!--//配置文件为 `/config/base.js`-->
```
webpack
```
生成的文件将会在 `/dist/dev` 里。

如果动了首页模版`index.ejs`需要重新build。
### 生产环境
<!--配置文件为 `/config/production.js`-->
```
npm run pro
```
生成的文件将会在 `/dist/pro` 里, 且文件会被压缩。
