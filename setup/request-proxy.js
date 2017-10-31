const request = require('request');
request.GET = request.get;
request.POST = request.post;
request.PUT = request.put;
request.DELETE = request.delete;

module.exports = function(url){
  return function(req, res, next){
    var method = req.method;
    var x = request[method](url + req.url);
    x.on('error', function(err){
      console.log(`\u001b[31m后端服务器挂了\u001b[39m: ${err.address}:${err.port}`);
      return res.status(500).send('后端服务器挂了');
    });
    req.pipe(x);
    x.pipe(res);
  }
}
