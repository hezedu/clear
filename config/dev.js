var  conf = {
  indexDir: './',
  staticPath : '/dist',
  baseUrl: '',
  indexData: { //这里数据将会传给index.ejs。
    //build时传自动添加：BASE_URL,BASE_STATIC两个属性。
  }
};

module.exports = conf;
