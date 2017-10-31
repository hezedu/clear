var _ = require('lodash');
var base = require('./dev');

const conf = {
  indexDir: './',
  bundleName: '[name]_bundle_[chunkhash].js',   //打包文件的名字
  chunkName: '[name]_chunk_[chunkhash].js',     //由code-spliting生成的文件名字
  staticPath : 'dist',
  baseUrl: '',
  indexData: { //这里数据将会传给index.ejs。
    BASE_STATIC:'/dist'
    //build时传自动添加：BASE_URL,BASE_STATIC两个属性。
  }
};

module.exports =  _.merge(base, conf);
