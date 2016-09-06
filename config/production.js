var _ = require('lodash');
var base = require('./base');

const conf = {
  staticPath : '',
  baseUrl: '/clear',
};

conf.webpack = {
  indexFile: './docs/index.html',
  uglify: true
};

module.exports =  _.merge(base, conf);
