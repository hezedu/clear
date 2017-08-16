var _ = require('lodash');
var base = require('./dev');

const conf = {
  indexDir: './',
  staticPath : 'dist',
  baseUrl: '/clear',
  indexData: { //这里数据将会传给index.ejs。
    BASE_STATIC:'/dist'
    //build时传自动添加：BASE_URL,BASE_STATIC两个属性。
  }
};

module.exports =  _.merge(base, conf);
