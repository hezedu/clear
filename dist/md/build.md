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
生成的文件将会在 `/dist/pro` 里。


***.gitignore***

如果你使用git的话，默认 `/dist/pro` 除了 `a_vendor_bundle.js` 都被git忽略，这是为了检查**vendor**是否被修改。你可以在根目录的 `.gitignore` 文件里修改。
## 研究:只用一台电脑发布
由于npm安装的版本大都是以`^`开头，`^`开头是有小版本波动的。即使用安装的时候使用 `-E`精准模式安装固定版本,但也只保证你的`package.json`都是固定版本。你不能保证你安装的
依赖也是固定版本。

比如说你用`npm install redux -E --save`精准的安装**3.8.0**的`redux`, `redux`依赖`"loose-envify": "^1.1.0"` 但你安装的确是`.1.2.0@loose-envify`, 之后你也有可能安装`.1.3.0@loose-envify`。

如果团队合作的话，不同人在不同时期安装，可能会出现版本细微差异，以致于build出的文件不同, 以致于http缓存的失效。而**只用一台电脑发布**将避免上述问题。

-------
