var _ = require('lodash');
var base = require('./base');

const conf = {
  baseUrl: '',
  staticPath : '',
  webpack: {
    indexDir: './dist'
  }
};

module.exports =  _.merge(base, conf);
