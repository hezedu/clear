const fs = require('fs');
const path = require('path');
const sas = require('sas');


function _readdir(dir, th){
  return function (cb){
    fs.readdir(dir, function(err, files){
      if(err){
        return cb(err);
      }
      const tasks = {};
      files.forEach(fileName => {
        tasks[fileName] = _stat(dir, fileName,  th)
      });
      cb('$reload', tasks);
    });
  }

}
function _stat(rpath, name,  th) { //iterator
  return function(cb) {
    const _path = path.join(rpath, name);
    fs.stat(_path, function(err, stat) {
      if (stat.isDirectory()) {
        th[name] = {};
        return cb('$reload', _readdir(_path, th[name]));
      }
      th[name] = 'file';
      cb();
    });
  }
}

var router = {};
function getRoutes(dir, callback){
  sas(_readdir(dir, router), function(err){
    callback(err, router)
  })
}



function ite(result, rpath){
  const arr = [];
  for(let i in result){
    const v = result[i];
    const link = rpath + '/' + i
    const obj = {
      path : i,
      link
    };
    if(v !== 'file'){
      obj.child = ite(v, link);
    }
    arr.push(obj);
  }
  return arr;
}

function initVueRouter(callback){
  getRoutes('./src', function(err, result){
    if(err){
      return callback(err);
    }
    //console.log('result', result);
    const vueRouter = ite(result, '')
    callback(null, vueRouter)
  });
}

initVueRouter(function(err ,result){
  console.log(JSON.stringify(result, null, '\t'));
})
// var rootDir = '/', depth = 0, deepestPath;
//
// function readdir(cb, i) {
//   var indexs = i.indexs(), path = rootDir + indexs.join('/');
//   if (indexs.length > depth) { //record
//     depth = indexs.length;
//     deepestPath = path;
//   }
//   fs.readdir(path, function(err, files) {
//     if (err || !files.length) return cb();
//     var tasks = {}, i = 0, len = files.length;
//     for (; i < len; i++) {
//       tasks[files[i]] = path + '/' + files[i];
//     }
//     cb('$reload', tasks);
//   });
// }
//
//
// function stat(path) { //iterator
//   return function(cb) {
//     fs.lstat(path, function(err, stat) {
//       if (err || stat.isSymbolicLink()) return cb();
//       if (stat.isDirectory()) {
//         return cb('$reload', readdir);
//       }
//       cb();
//     });
//   }
// }

// function initTopLeftNav(dir, callback){
//   fs.readdir(dir, function(err, files){
//     if(err){
//       return callback(err);
//     }
//     router.topLeftNav = files;
//     callback(null, files)
//   })
// }
//
// function initTopNav(dir, callback){
//   initTopLeftNav(dir, function(err, topLeftNav){
//     topLeftNav.forEach(name => {
//
//       const _path = path.join(dir, name);
//       fs.readdir(_path, function(err, files){
//         if(err){
//           return callback(err);
//         }
//         router.topNav = files;
//         callback(null, files)
//       })
//
//     })
//
//   })
//
// }
//
// initTopLeftNav('./', function(){
//   console.log(arguments);
// });
