var conf = require('./lib_conf');
var module = {};
conf.forEach(function(v, i){
  module[v] = require(v);
})

window.__clear_webpack__ = {
  module: module
}
console.log(module);
