import * as layout from './cmpt/layout.jsx';
import {LoginBox} from './cmpt/login.jsx';
import { Route, IndexRoute} from 'react-router';
export default (
  <Route path={window.CONFIG.ROOT_PATH} component={layout.Root}>
    <Route path="login" component={LoginBox}/>
    <Route component={layout.Top}>
      <IndexRoute component={layout.Home}/>
      <Route onEnter={layout.Top.isLogin}>
        <Route path="env" component={layout.Left}>
          <Route path="about" component={layout.About}/>
        </Route>
      </Route>
    </Route>
  </Route>
);
