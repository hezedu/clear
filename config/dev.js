var  conf = {
  indexDir: './',
  staticPath : '/dist',
  server: { //这里是index.html 里的SERVER_CONF
    baseUrl: ''
  }
};

conf.server.baseStatic = conf.server.baseUrl + conf.staticPath;

module.exports = conf;
