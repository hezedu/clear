# webpack
webpack 文件名：
- [id] 为 array的index  会变
- [name] 为 object的key. 不会变
- [hash] 整个项目hash
- [chunkhash] 单个文件hash


### 缺陷
当import 位置变了，vendor也会变。
webpack --optimize-occurence-order 没有chunk好使

### code-spliting
chunk 没有 name
引用多个chunk有相同文件时，会重复打包。
比如：
require(['/flie1', '/flie2'])
require(['/flie1', '/flie3'])
会生成两个chunk, 每个chunk都会有一个flie1。

由于webpack 使用数组索引，所以有很多不确定性。
数组排序跟文件系统文件排序有关。
chunk会排在bundle前面。加一个chunk相当于往数组里插入一条，排在它后面的文件都要变。
所以一个小小的改动就会引起200多kb的vendor改变。
