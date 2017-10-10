import * as layout from './cmpt/layout';
//import * as test from './cmpt/test/index';
import LoadingRoutes from './cmpt/loading-routes';
export const navRoutes = [];
export const defChildRoutes = [{ path: '*', component: LoadingRoutes}];
export default {
  component: layout.Root,
  childRoutes: defChildRoutes
};
