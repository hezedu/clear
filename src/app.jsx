
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import virgin from 'virgin';

const mount = document.getElementById('app');
virgin.BASE_URL = mount.getAttribute('base-url') || '';
virgin.BASE_STATIC = mount.getAttribute('base-static') || '';//静态文件path.

const history = useRouterHistory(createHashHistory)({queryKey: false});
import AppRoutes from './router.config';

ReactDOM.render(
  <Router history={history} routes={AppRoutes} />,
  mount
);
