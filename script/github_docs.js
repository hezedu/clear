process.env.NODE_ENV = 'production';
var child_process = require('child_process');

var build_sh = 'webpack --colors';
console.log('开始build...');
child_process.exec(build_sh, function(err, result){
  if(err){
    return console.log('build 失败', err);
  }
  console.log(result);
});

//var path = require('path');
// function(env){
//   if(process.platform.substr(0,3)==='win'){
//     return 'set NODE_ENV=' + env + '&& '
//   }
//   return 'NODE_ENV=' + env + ' ';
// }
//var del = require('fuckwinfsdel');
//var clearDir = path.join('__dirname','../', conf.outPutDir, conf.outPutFile);
// var util = require('./util');
// var envFactory = util.envFactory;
//var sh = envFactory('production') + build_sh;
// console.log('开始清空:',clearDir);
// del(clearDir, function(){
//   console.log('开始build...');
//   child_process.exec(build_sh, function(err, result){
//     if(err){
//       return console.log('build 失败', err);
//     }
//     console.log(result);
//   });
// });
