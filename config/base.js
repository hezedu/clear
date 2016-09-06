const conf = {
  staticPath : '/docs',
  baseUrl: '',
};

conf.webpack = {
  indexFile: './index.html', //首页文件所在
  uglify: false//是否压缩
};

module.exports = conf;
