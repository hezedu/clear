import Home from './cmpt/home';
import * as  layout from './cmpt/layout';

export default {
  path: '/',
  component: layout.Top,
  indexRoute: { component: Home },
  childRoutes:[
    {path:'*', component: layout.NotFound}
  ]
};
