import ReactDOM from 'react-dom';
import { Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import AppRoutes from './router.jsx';
import clear from 'clear';

const mount = document.getElementById('app');
clear.rootPath = mount.getAttribute('rootpath') || '/';

ReactDOM.render(
  <Router history={useRouterHistory(createHashHistory)({queryKey: false})} routes={AppRoutes} />,
  mount
);
