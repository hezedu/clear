import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import AppRoutes from './router.jsx';
import {ClearLink} from './lib/hack.jsx';
//const history = syncHistoryWithStore(browserHistory, store);
//  <Provider store={store}>

//设置 rootPath
const ROOT_PATH = window.CONFIG.ROOT_PATH;
ClearLink.rootPath = ROOT_PATH === '/' ? '' : ROOT_PATH;

ReactDOM.render(
    <Router history={browserHistory} routes={AppRoutes} />,
  document.getElementById('app')
);
