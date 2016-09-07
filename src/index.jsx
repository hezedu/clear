
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import clear from 'clear';

const mount = document.getElementById('app');
clear.BASE_URL = mount.getAttribute('base-url') || '';//静态文件path.
clear.BASE_STATIC = mount.getAttribute('base-static');//静态文件path.

import AppRoutes from './router.conf';
const history = useRouterHistory(createHashHistory)({queryKey: false});

ReactDOM.render(
  <Router history={history} routes={AppRoutes} baseUrl={clear.BASE_URL} />,
  mount
);
