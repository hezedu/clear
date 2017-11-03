import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import routingStore from './store/routing';
import { Provider } from 'react-redux'

const mount = document.getElementById('app');
let history = useRouterHistory(createHashHistory)({queryKey: false});
history = syncHistoryWithStore(history, routingStore);

import AppRoutes from './router.config';
window.$.ajaxSetup({
  error(res){
    if(res.status === 401){
      return alert('你得先登录gitLab才能仿问。')
    }
  }
})
// window.$.ajaxError = function(args){
//   console.log('ajaxError', args)
// }
ReactDOM.render(
  <Provider store={routingStore}>
    <Router history={history} routes={AppRoutes} />
  </Provider>,
  mount
);
