var _ = require('lodash');
var base = require('./base');

const conf = {
  baseUrl: '/clear',
  staticPath : '',
  webpack: {
    indexDir: './docs'
  }
};

module.exports =  _.merge(base, conf);
