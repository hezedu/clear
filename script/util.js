exports.envFactory =  function(env){
  if(process.platform.substr(0,3)==='win'){
    return 'set NODE_ENV=' + env + '&& '
  }
  return 'NODE_ENV=' + env + ' ';
}

exports.execLog = function(){console.log.apply(this, arguments)};
