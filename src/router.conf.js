//import clear from 'clear';
import * as layout from './cmpt/layout.jsx';
import {LoginBox} from './cmpt/login.jsx';
//-import * as env from './cmpt/main/env.jsx';

export const navRoutes = [
  {path: 'env', component: layout.Left, title: '环境',
    childRoutes:[
      {path: 'start', component: layout.Main, title: '开始',
      childRoutes:[
        {path: 'about2', component: layout.About, title: 'test'}
      ]},
      {path: 'css', component: layout.About, title: 'css'}
    ]},
  {path: 'study', component: layout.study, title: '文档'},
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
