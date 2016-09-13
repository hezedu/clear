
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';


const mount = document.getElementById('app');

const history = useRouterHistory(createHashHistory)({queryKey: false});
import AppRoutes from './router.config';

ReactDOM.render(
  <Router history={history} routes={AppRoutes} />,
  mount
);
