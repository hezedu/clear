### bundleName
同webpack的`bundleName`
### chunkName
同webpack的`chunkName`
### indexDir
`index.html`文件的根目录
### baseUrl
App开始的根路径。比如https://hezedu.github.io/clear的**/clear**就是`baseUrl`
### staticPath
静态文件目录， 会添加`BASE_STATIC`到`indexData`中：
- `/`开头的，将会保持不变
- http://xxx.com 外部的，将会保持不变
- 其它将会和`baueUrl`相加： `baseUrl` + `/` + `staticPath`
比如：`baseUrl` = **/clear**, `staticPath` = **static**, 那么`BASE_STATIC` = **/clear/static**

### indexData
自定义注入到首页模版的数据。