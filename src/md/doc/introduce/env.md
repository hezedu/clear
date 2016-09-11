# 开发server
启用了**hot-load**热加载，你不需要刷新浏览器就可以看到更新。
# JS
你可以使用**es6**语法。
# css
### sass
本项目使用**sass**，sass的文件后缀为`.scss`.
```css
/*scss 变量功能*/
$color:red;
.title{color:$color}
.nav{background: $color}
```
关于sass
<a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#css_extensions" target="_blank">更多</a>

### posscss
本项目还使用基于<a href="https://github.com/postcss/postcss" target="_blank">posscss</a>的**rucksack**，并启用了`autoprefixer`(自动添加浏览器前缀)插件。
```css
.foo {transition: all;}
```
将会被转换为：
```css
.foo {
  -webkit-transition: all;
  transition: all;
}
```
关于rucksack
<a href="http://simplaio.github.io/rucksack/" target="_blank">更多</a>
### modules
为了防止命名冲突,本项目启用了**modules**功能。它前会为你的样式添加hash后缀。
```css
.foo {color: red}
```
将会被转换为：
```css
.foo_2JR5_{color: red}
```
使用：
```js
import styles from "../css/style.scss";
import { Component } from 'react';

class Root extends Component {
  render(){
    return <h1 className={styles.foo}>hello world</h1>;
  }
}
```
全局和本地的转换：
```css
:global { /*global都不会被转*/
.foo {color: red}
.active{border:1px solid #666}
}
.foo {color: red} /*会被转*/
.foo .active{background-color : green} /*都会被转*/
.foo :global(.active){background-color : black} /*foo会被转,active还是active*/
```
结果：
```css
.foo {color: red; }
.active {border: 1px solid #666; }
.foo_1NjV3 {color: red; }
.foo_1NjV3 .active_2biR5 {background-color: green; }
.foo_1NjV3 .active {background-color: black; }
```
关于CSS modules
<a href="https://github.com/webpack/css-loader#css-modules" target="_blank">更多</a>
