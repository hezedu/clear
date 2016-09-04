export const getParentPath = ($root) => {
  const obj = {path: ''};
  _getParentPath($root, obj);
  return obj.path;
};
const _getParentPath = ($root, obj) => {
  let path = $root.route.path;
  if(!path || path === '/'){
    path = '';
  }
  obj.path = obj.path + path;
  if($root.children){
    _getParentPath($root.children.props, obj);
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
