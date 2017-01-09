import * as layout from './cmpt/layout';
//import * as test from './cmpt/test/index';

export const navRoutes = [
  {path: 'doc', component: layout.Left, title: '文档', firstChildIndex: true,
    childRoutes:[
      {path: 'start', component: layout.Main, title: '开始',
        childRoutes:[
        ]},
      {path: 'introduce',  title: '项目介绍', firstChildIndex: true,
        childRoutes:[
          {path: 'env', component: layout.Main, title: '环境'},
          //{path: 'build', component: layout.Main, title: '构建命令'},
          {path: 'list', component: layout.Main, title: '目录'},
          {path: 'pit', component: layout.Main,  title: '开发注意事项' }
        ]}
    ]},
  {path: 'build', component: layout.Main,  title: 'build' },
  {path: 'features', component: layout.Main,  title: '特性' },
  // {path: 'high_grade', component: layout.Left, title: '高级', firstChildIndex: true,
  // childRoutes:[
  //   {path: 'webpack', component: layout.Main, title: 'webpack'}
  // ]},
  // {path: 'test', component: layout.Left, title: 'test', firstChildIndex: true,
  //   childRoutes:[
  //     {path: 'props_state', component:test.PropsAndState, title: 'props和state'},
  //     {path: 'hotload', component:test.HotLoad, title: 'hot-load'},
  //     {path: 'async', component:test.Async, title: '异步加载',
  //       childRoutes:[
  //       //  {path: 'dynamic_routing', getComponents, title: '动态路由'},
  //       ]},
  //   ]},

];

export default {
  path: '/', component: layout.Root,
  childRoutes: [
    { component: layout.Top,
      indexRoute: {component: layout.Home },
      childRoutes:navRoutes},
    { path: '*', component: layout.Error}
  ]
};
