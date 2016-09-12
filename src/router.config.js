import Home from './cmpt/home.jsx';
import List from './cmpt/list.jsx';
import Detail from './cmpt/detail.jsx';
import * as Mui from './cmpt/material_ui.jsx';

const dynamicRouting = {
  path: 'dynamic_routing',
  title: '动态路由',
  getComponents: function(nextState, callback) {
    require(['./cmpt/dynamic_routing.jsx'], function (cmpt) {
      callback(null, cmpt.default);
    });
  }
};

export default {
  path: '/',
  indexRoute: { component: Home },
  childRoutes:[
    {path: 'list', component: List, title: '列表'},
    {path: 'detail/:id', component: Detail, title: '详情'},
    dynamicRouting ,
    {path: 'material_ui', component: Mui.Theme, title: 'material-ui',
      childRoutes:[
        //{path : 'app_bar', component: Mui.AppBar, title: 'AppBar'}
      ]}
  ]
};
