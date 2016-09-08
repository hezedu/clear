//import clear from 'clear';
import * as layout from './cmpt/layout.jsx';
import {LoginBox} from './cmpt/login.jsx';
//import { About } from './cmpt/about.jsx';
//-import * as env from './cmpt/main/env.jsx';

const getComponents = function(filePath){
  return function(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require(filePath));
    });
  };
};
export const navRoutes = [
  {path: '/doc', component: layout.Left, title: '文档',
    childRoutes:[
      {path: 'start', component: layout.Main, title: '开始',
        childRoutes:[
          // {path: 'about2', getComponents: getComponents('./cmpt/about.jsx'), title: 'test'}
        ]},
      // {path: 'css', component: About, title: 'css'},
      // {path: 'standard', component: About, title: '规范'}
    ]},
  {path: '/test', component: layout.study, title: 'test'}
];

export default {
  component: layout.Root,
  childRoutes: [
    { path: '/login', component: LoginBox },
    { path: '/', component: layout.Top,
    childRoutes:[
      {indexRoute: {component: layout.Home }},
      {path: '/', //onEnter:clear.isLogin,
      childRoutes:navRoutes}
    ]},
    { path: '*', component: layout.Error}
  ]
};
