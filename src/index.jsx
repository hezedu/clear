import ReactDOM from 'react-dom';
import { Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import AppRoutes from './router.conf';
import clear from 'clear';

const history = useRouterHistory(createHashHistory)({queryKey: false});
const mount = document.getElementById('app');

clear.baseStatic = mount.getAttribute('base-static');//静态文件path.

ReactDOM.render(
    <Router history={history} routes={AppRoutes} />,
  mount
);
