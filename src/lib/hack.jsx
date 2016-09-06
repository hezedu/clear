class test{
  constructor(msg){
    this.msg = msg;
  }
}
console.log('test.constructor', test.constructor);
console.log('prototype.constructor', test.prototype.constructor);
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
//   //static contextTypes = ClearRouter.childContextTypes;
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
// //class ClearRouter2 extends Root {};
// export class ClearRouter extends Router {
//   static childContextTypes = {parentPath: React.PropTypes.string};
//   static contextTypes = ClearRouter.childContextTypes;
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
