var _ = require('lodash');
var base = require('./dev');

const conf = {
  indexDir: './dist',
  staticPath : '',
  baseUrl: ''
};

module.exports =  _.merge(base, conf);
