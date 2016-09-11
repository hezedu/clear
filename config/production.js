var _ = require('lodash');
var base = require('./base');

const conf = {
  baseUrl: '/clear',
  staticPath : '/dist',
  webpack: {
    indexDir: './'
  }
};

module.exports =  _.merge(base, conf);
