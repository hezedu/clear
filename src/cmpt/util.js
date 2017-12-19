function ite(result, rpath, depth){
  const arr = [];
  for(let i in result){
    const v = result[i];
    if(!v){
      const lastIndex = i.lastIndexOf('.md');
      if(lastIndex !== -1){
        i = i.substr(0, lastIndex);
      }
    }
    const link = rpath + '/' + i;

    const obj = {
      link
    };
    if(v){
      obj.childRoutes = ite(v, link, depth + 1);
      // if(obj.childRoutes.length){
      //   obj.firstChildIndex = true;
      //   obj.redirectTo = obj.childRoutes[0].link;
      // }
    }else if(i === 'README'){
      //obj.isIndex = true;
    }
    obj.path = i;
    obj.title = decodeURI(i);
    arr.push(obj);
  }
  return arr;
}

export function forMatData(data){
  const obj = {};
  data.forEach(v => {
    var isFile = v.type !== 'tree';
    if(v.name[0] === '.'){
      return;
    }
    if(isFile){
      if(v.name.lastIndexOf('.md') === -1){
        return;
      }
    }
    let path = encodeURI(v.path);
    let pathArr = path.split('/');
    let lastIndex = pathArr.length - 1;
    let _obj = obj;
    pathArr.forEach((k, i) => {
      if(i === lastIndex && isFile){
        _obj[k] = null;
      }else{
        if(!_obj[k]){
          _obj[k] = {};
        }
        _obj = _obj[k]
      }
    });
  });
  return obj;
}
export function initRouter(result, rPath){
  rPath = rPath || '';
  return ite(result, rPath, 0);
}
