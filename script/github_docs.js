var path = require('path');
var conf = require('./conf');
var del = require('fuckwinfsdel');
var child_process = require('child_process');
var util = require('./util');
var envFactory = util.envFactory;

var build_sh = 'webpack --colors'
var sh = envFactory('production') + build_sh;
var clearDir = path.join('__dirname','../', conf.outPutDir, conf.outPutFile);
console.log('开始清空:',clearDir);
del(clearDir, function(){
  console.log('开始build...');
  child_process.exec(envFactory('production') + build_sh, function(err, result){
    if(err){
      return console.log('build 失败', err);
    }
    console.log(result);
  });
});
