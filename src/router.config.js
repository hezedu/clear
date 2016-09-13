import Home from './cmpt/home';
import * as  layout from './cmpt/layout';
import demo from './cmpt/demo';

export default {
  path: '/',
  component: layout.Top,
  indexRoute: { component: Home },
  childRoutes:[
    {path:'demo', component: demo},
    {path:'*', component: layout.NotFound}
  ]
};
