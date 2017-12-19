var path = require('path');
var express = require('express');
var http = require('http');
var requestProxy = require('./request-proxy-same-domain');
var app = express();
var DAY_TIME = 1000 * 60 * 60 * 24 //一天
var MONTH_TIME  = DAY_TIME * 30 //一月
//var HALF_YEAR_TIME  = MONTH_TIME * 6; //半年
var indexPath = path.join(__dirname , '../');
var distPath = path.join(__dirname , '../dist');

module.exports = function(config){
  var port = config.port;
  var proxyPort = config.proxyPort;
  app.use('/api/v3', requestProxy(proxyPort, '/api/v3'));
  app.use('/md', requestProxy(proxyPort, ''));


  //首頁不緩存
  app.get('/', express.static(indexPath));
  //其它緩存一月
  app.use('/dist', express.static(distPath, {maxAge:MONTH_TIME}));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
  });


  var server = http.createServer(app);
  server.listen(port);
  console.log('server run ' + port);
}