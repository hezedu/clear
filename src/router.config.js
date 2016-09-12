import Home from './cmpt/home.jsx';
import List from './cmpt/list.jsx';
import Detail from './cmpt/detail.jsx';

const dynamicRouting = {
  path: 'dynamic_routing',
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
    dynamicRouting
  ]
};
