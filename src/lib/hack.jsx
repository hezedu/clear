import React, { Component, PropTypes} from 'react';
import { Link , Router, Route} from 'react-router';
import clear from 'clear';
//console.log(Router.prototype);
const parentPath = PropTypes.string;

const _setContext = (t, attr = 'contextTypes') => {
  if(!t[attr]){
    t[attr] = {};
  }
  t[attr].parentPath = React.PropTypes.string;
};
const bindContext  = (t) => {
  t.prototype._getChildContextParentPathBak = t.prototype.getChildContext;

  t.prototype.getChildContext = function (){
    let result;
    if(this._getChildContextParentPathBak){
      result = this._getChildContextParentPathBak();
    }else{
      result = {};
    }
    result.parentPath = this.props.link;
    return result;
  };
};

const _commonSet = (t) => {
  _setContext(t, 'childContextTypes');
  bindContext(t);
};


export class ClearRoot extends Component {//出现router
  static contextTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };
  static childContextTypes = {
    parentPath
  }
  getChildContext(){
    return {parentPath : ''};
  }
  componentWillMount(){
    clear.router = this.context.router;
    clear.location = this.context.location;
  }
  render() {
    return this.props.children;
  }
}

// const tree = (arr, rpath) => {
//   const arr2 = [];
//   arr.forEach((v, i) => {
//     v.link = `${rpath}/${v.path}`;
//     let childRoutes = '';
//     if (v.childRoutes) {
//       childRoutes = <ul>{tree(v.childRoutes, v.link)}</ul>;
//     }
//     arr2[i] = (
//       <li key={v.path}>
//         <Link to={v.link}>{v.title}</Link>
//         {childRoutes}
//       </li>);
//   });
//   return arr2;
// };

export class ClearRoute extends Component{
  static contextTypes = {
    parentPath
  };
  static childContextTypes = {
    parentPath
  };
  getChildContext(){
    return {parentPath: this.props.link};
  }
  render(){
    return null;
  }
}

function pathFormat(path){
  path = path || '';
  path = path === '*' ? '' : path;
  if(path){
    if(path[0] !== '/'){
      path = '/' + path;
    }
    const len = path.length;
    if(path[len - 1] === '/'){
      path = path.substr(0, len - 1);
    }
  }
  return path;
}

const _ite = (arr, rpath) => {
  arr.forEach((v) => {
    v.link = rpath + pathFormat(v.path);
    // if(v.component){
    //   _commonSet(v.component);
    // }
    if(v.childRoutes){
      _ite(v.childRoutes);
    }
  });
};


export class ClearRouter extends Component {
  routesFormat(){
    const routes = this.warpRoot();

    _ite(routes.childRoutes);
    return routes;
  }
  warpRoot(){
    let routes = this.props.routes;
    routes = Array.isArray(routes) ? routes : [routes];
    return {
      path : this.props.baseUrl,
      component: ClearRoot,
      childRoutes: routes
    };
  }
  state = {};
  componentWillMount(){
    this.state.routes = this.routesFormat();
  }
  render() {
    return <Router {...this.props} routes={this.state.routes}  />;
  }
}


export class ClearLink extends Link {
  render() {
    let to = this.props.to;
    let pathname = (typeof to === 'string') ? to : to.pathname;
    if(pathname[0] !== '/'){
      pathname = this.context.parentPath + '/' + to;
    }
    if(typeof to === 'string'){
      to = pathname;
    }else{
      to.pathname = pathname;
    }
    return <Link {...this.props} to={to} />;
  }
}

//_setContext(ClearRouter, 'childContextTypes');


// export class ClearRouter extends Component {
//   componentWillMount(){
//     //var routes = this.props.routes;
//   }
//   render() {
//     return <Router {...this.props} />;
//   }
// }
// export class ClearRoute extends Component {
//   getChildContext(){
//     var path = this.props.route.path || '';
//     if(path){
//       if(path[0] !== '/'){
//         path = '/' + path;
//       }
//       const len = path.length;
//       if(path[len - 1] === '/'){
//         path = path.substr(0, len - 1);
//       }
//     }
//     return {parentPath : this.context.parentPath + path};
//   }
//   render() {
//     return <Route {...this.props} />;
//   }
// }

// export class ClearLink extends Link {
//   render() {
//     //     const to = this.props.to;
//     //     const pathname = (typeof to === 'string') ? to : to.pathname;
//     let to = this.props.to;
//     let pathname = (typeof to === 'string') ? to : to.pathname;
//     if(pathname[0] !== '/'){
//       pathname = this.context.parentPath + '/' + to;
//     }
//     if(typeof to === 'string'){
//       to = pathname;
//     }else{
//       to.pathname = pathname;
//     }
//     return <Link {...this.props} to={to} />;
//   }
// }


// const multipleInher = (c1, c2) => {
//   class tmp{};
// }
// const multipleInher = Sup => class extends Sup{
//   constructor(...args){
//     super(...args);
//   }
// };
// const test = (...args) => {
//   console.log('args', args);
//   console.log('args', typeof args);
//   // class tmp {};
//   const last = args.length - 1;
//   var result = args[last];
//   let empty;
//   for(let i = last; i >= 0; i--){
//     result = multipleInher(args[i]){
//       constructor(...args){
//         super(...args);
//       }
//     };
//     result = empty;
//     typeof result;
//   }
//   // return multipleInher()
// };
// typeof test;
// import React, { Component } from 'react';
// import { Link , Router} from 'react-router';
// //import clear from 'clear';

// Router.contextTypes = Router.childContextTypes = {parentPath: React.PropTypes.string};
// Router.prototype.getChildContext = () => ({parentPath : 'test'});
// const multipleInher = Sup => class extends Sup{
//   constructor(...args){
//     super(...args);
//   }
// };

// typeof multiple;
// class Root extends Component {
//   static childContextTypes = {parentPath: React.PropTypes.string};
//   //static contextTypes = ClearRoute.childContextTypes;
//   getChildContext(){
//     var path = this.props.route.path || '';
//     if(path){
//       if(path[0] !== '/'){
//         path = '/' + path;
//       }
//       const len = path.length;
//       if(path[len - 1] === '/'){
//         path = path.substr(0, len - 1);
//       }
//     }
//     return {parentPath : this.context.parentPath + path};
//   }
// }
// //class ClearRoute2 extends Root {};
// export class ClearRoute extends Router {
//   static childContextTypes = {parentPath: React.PropTypes.string};
//   static contextTypes = ClearRoute.childContextTypes;
//   getChildContext(){
//     var path = this.props.route.path || '';
//     if(path){
//       if(path[0] !== '/'){
//         path = '/' + path;
//       }
//       const len = path.length;
//       if(path[len - 1] === '/'){
//         path = path.substr(0, len - 1);
//       }
//     }
//     return {parentPath : this.context.parentPath + path};
//   }
// }
// export class ClearLink extends Link {
//
// }
//import { getParentPath , getRelativePath, getLastRoute, getCurrPath} from './index';
// export class ClearLink extends Link {
//   getCurrPath(){
//     const crrRoute = getLastRoute(clear.$root);
//     //const routes = this.props.routes;
//     getCurrPath(clear.$root.routes, crrRoute.route);
//     //console.log('crrRoute', crrRoute);
//   }
//   componentWillMount(){
//     const to = this.props.to;
//     const pathname = (typeof to === 'string') ? to : to.pathname;
//     // let pathname = (typeof to === 'string') ? to : to.pathname;
//     let currPath = '';
//     if(pathname[0] === '/'){
//       currPath = pathname;
//     }else{
//       const parentPath = getParentPath(clear.$root, this);
//       if(pathname[0] !== '.'){
//         currPath = parentPath + '/' + pathname;
//       }else{
//         currPath = getRelativePath(parentPath, pathname);
//       }
//     }
//     this.currPath = currPath;
//   }
//   render() {
//     this.getCurrPath();
//     //console.log('render');
//     let to = this.props.to;
//     if(typeof to === 'string'){
//       to = this.currPath;
//     }else{
//       to.pathname = this.currPath;
//     }
//     return (
//       <Link {...this.props} to={to} />
//     );
//   }
// }
