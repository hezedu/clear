import { Link } from 'react-router';
import clear from 'clear';
import { getParentPath , getRelativePath} from './index';
//增加 Component this.context

//增加了 rootPath 特性
//to 前面不加 “/” 的话，自动添加rootPath + 父级path
export class ClearLink extends Link {

  render() {
    let to = this.props.to;
    const pathname = (typeof to === 'string') ? to : to.pathname;

    // let pathname = (typeof to === 'string') ? to : to.pathname;
    let currPath = '';
    if(pathname[0] === '/'){
      currPath = pathname;
    }else{
      const parentPath = getParentPath(clear.$root);
      if(pathname[0] !== '.'){
        currPath = parentPath + '/' + pathname;
      }else{
        currPath = getRelativePath(parentPath, pathname);
      }
    }
    if(typeof to === 'string'){
      to = currPath;
    }else{
      to.pathname = currPath;
    }
    return (
      <Link {...this.props} to={to} />
    );
  }
}
