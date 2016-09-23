# 一些开发注意事项(坑)
**es6箭头函数** 如果在没有上下文的环境下编译的时候会把`this`变成`undefined`, 而`function`不会。

**hot-load** 在组件非react类生成的情况下(比如用纯函数`() => <div>test</div>`)改动不起作用。

**hot-load** 在异步加载情况下不起作用，除非用[动态路由](https://github.com/ReactTraining/react-router/blob/master/docs/guides/DynamicRouting.md)。

在babel es6环境下: `import Test from './Test'`=`var Test = require(./Test).default`, 而不是 `var Test = require(./Test)`

**webpack** `CommonsChunkPlugin`会在排在最后的一个文件里注入一些它自己的代码，比如`window["webpackJsonp"]`什么的。所以防止文件变动，最一个文件不要变。(比如下在的`a_out_lib`)
`new webpack.optimize.CommonsChunkPlugin({names: ['b_react_vendor', 'a_out_lib'], filename: 'bundleName'})`

***最后编辑:2016/9/16***
