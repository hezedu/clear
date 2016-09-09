//import clear from 'clear';
import * as layout from './cmpt/layout.jsx';
import {LoginBox} from './cmpt/login.jsx';
import { About } from './cmpt/about.jsx';
import * as test from './cmpt/main/test/index.jsx';

export const navRoutes = [
  {path: 'doc', component: layout.Left, title: '文档', firstChildIndex: true,
    childRoutes:[
      {path: 'start', component: layout.Main, title: '开始',
        childRoutes:[
          {path: 'about2', component: About, title: 'test'}
        ]},
      {path: 'css', component: About, title: 'css'},
      {path: 'standard', component: About, title: '规范'}
    ]},
  {path: 'test', component: layout.Left, title: 'test', firstChildIndex: true,
    childRoutes:[
      {path: 'hotload', component:test.HotLoad, title: 'hot-load'},
      {path: 'async', component:test.Async, title: '异步加载',
        childRoutes:[
        //  {path: 'dynamic_routing', getComponents, title: '动态路由'},
        ]},
    ]}
];

export default {
  path: '/', component: layout.Root,
  childRoutes: [
    { path: 'login', component: LoginBox },
    { component: layout.Top, //onEnter:clear.isLogin,
      indexRoute: {component: layout.Home },
    childRoutes:navRoutes},
    { path: '*', component: layout.Error}
  ]
};
