import * as layout from './cmpt/layout.jsx';
import {LoginBox} from './cmpt/login.jsx';
import * as test from './cmpt/test/index.jsx';
import Pit from './cmpt/pit.jsx';

export const navRoutes = [
  {path: 'doc', component: layout.Left, title: '文档', firstChildIndex: true,
    childRoutes:[
      {path: 'start', component: layout.Main, title: '开始',
        childRoutes:[
        ]},
      {path: 'introduce',  title: '项目介绍', firstChildIndex: true,
      childRoutes:[
        {path: 'env', component: layout.Main, title: '环境'},
        {path: 'build', component: layout.Main, title: '构建命令'},
        {path: 'list', component: layout.Main, title: '目录'},
      ]}
    ]},
  {path: 'test', component: layout.Left, title: 'test', firstChildIndex: true,
    childRoutes:[
      {path: 'props_state', component:test.PropsAndState, title: 'props和state'},
      {path: 'hotload', component:test.HotLoad, title: 'hot-load'},
      {path: 'async', component:test.Async, title: '异步加载',
        childRoutes:[
        //  {path: 'dynamic_routing', getComponents, title: '动态路由'},
        ]},
    ]},
    {path: 'pit', component: Pit, title: '注意事项' }
];

export default {
  path: '/', component: layout.Root,
  childRoutes: [
    { path: 'login', component: LoginBox },
    { component: layout.Top,
      indexRoute: {component: layout.Home },
    childRoutes:navRoutes},
    { path: '*', component: layout.Error}
  ]
};
