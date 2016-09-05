import { Link } from 'react-router';
import clear from 'clear';
import { getParentPath , getRelativePath, getLastRoute, getCurrPath} from './index';
//增加 Component this.context

//增加了 rootPath 特性
//to 前面不加 “/” 的话，自动添加rootPath + 父级path
export class ClearLink extends Link {
  getCurrPath(){
    const crrRoute = getLastRoute(clear.$root);
    //const routes = this.props.routes;
    getCurrPath(clear.$root.routes, crrRoute.route);
    //console.log('crrRoute', crrRoute);
  }
  componentWillMount(){
    const to = this.props.to;
    const pathname = (typeof to === 'string') ? to : to.pathname;
    // let pathname = (typeof to === 'string') ? to : to.pathname;
    let currPath = '';
    if(pathname[0] === '/'){
      currPath = pathname;
    }else{
      const parentPath = getParentPath(clear.$root, this);
      if(pathname[0] !== '.'){
        currPath = parentPath + '/' + pathname;
      }else{
        currPath = getRelativePath(parentPath, pathname);
      }
    }
    this.currPath = currPath;
  }
  render() {
    this.getCurrPath();
    //console.log('render');
    let to = this.props.to;
    if(typeof to === 'string'){
      to = this.currPath;
    }else{
      to.pathname = this.currPath;
    }
    return (
      <Link {...this.props} to={to} />
    );
  }
}
