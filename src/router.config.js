import * as layout from './cmpt/layout';
//import * as test from './cmpt/test/index';
import LoadingRoutes from './cmpt/loading-routes';
import {Home} from './cmpt/layout';
export const navRoutes = [];
export const defChildRoutes = [{ path: ':id*', component: LoadingRoutes}];
export default {
  component: layout.Root,
  path: '/',
  indexRoute: {
    component: Home
  },
  childRoutes: defChildRoutes
};
