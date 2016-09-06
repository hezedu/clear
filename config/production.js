var _ = require('lodash');
var base = require('./base');

const conf = {
  baseUrl: '/clear',
  staticPath : '',
};

module.exports =  _.merge(base, conf);
