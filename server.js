var eStatic = require('express').static;
const path = require('path');
var DAY_TIME = 1000 * 60 * 60 * 24 //一天
var MONTH_TIME  = DAY_TIME * 30 //一月
//var HALF_YEAR_TIME  = MONTH_TIME * 6; //半年
var express = require('express');
var app = express();
var dir = __dirname;
var config = require('./config');
var port = config.port;
var requestProxy = require('./setup/request-proxy-same-domain');

app.use('/api/v3', requestProxy(port))
app.use('/md', requestProxy(port))

const distPath = path.join(dir , '/dist/pro');
  //首頁不緩存
app.get('/', eStatic(path.join(dir, 'index.html')));
  //其它緩存一月
app.use(eStatic(distPath, {maxAge:MONTH_TIME}));


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

var http = require('http');
var server = http.createServer(app);
server.listen(port);