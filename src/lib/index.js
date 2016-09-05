export const getParentPath = ($root, $t) => {
  const obj = {path: ''};
  _getParentPath($root, obj, $t);
  return obj.path;
};
const _getParentPath = ($root, obj, $t) => {
  let path = $root.location.path;
  if(!path || path === '/'){
    path = '';
  }else if(path[0] !== '/'){
    path = '/' + path;
  }
  obj.path = obj.path + path;
  if($root.children){
    // console.log('$t', $t);
    if($t){
      _getParentPath($root.children.props, obj, $t);
    }
  }else{
    //console.log('$root.children', $root);
  }
};

export const getLastRoute = ($root) => {
  if($root.children){
    return getLastRoute($root.children.props);
  }else{
    return $root;
  }
};

export const getCurrPath = (routes, currRoute) => {
  //let path = '';
  for(let i = 0, len = routes.length; i < len; i++){
    const v = routes[i];
    if(v === currRoute){
      console.log(i, v);
    }
  }
};

export const getRelativePath = (parentPath, pathname) => {
  const pointLen = pathname.indexOf('/');
  pathname = pathname.substr(pointLen);
  const pArr = parentPath.split('/');
  for(let i = 0; i < pointLen; i++){
    pArr.pop();
  }
  parentPath = pArr.join('/');
  // console.log('parentPath', parentPath);
  // console.log('pathname', pathname);
  return  parentPath + pathname;
};
