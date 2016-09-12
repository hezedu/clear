var _ = require('lodash');
var base = require('./dev');

const conf = {
  indexDir: './dist',
  staticPath : '',
  server: {
    baseUrl: ''
  }
};

conf.server.baseStatic = conf.server.baseUrl + conf.staticPath;
module.exports =  _.merge(base, conf);
