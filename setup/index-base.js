var requestProxy = require('./request-proxy');
module.exports = function(app){
  app.use('/api', requestProxy('http://1222320/api'))
}
