import { Component , PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import AppRoutes from './router.jsx';

//增加 Component this.context
Component.contextTypes = {
  router: PropTypes.object.isRequired
};

//const history = syncHistoryWithStore(browserHistory, store);
//  <Provider store={store}>
ReactDOM.render(
    <Router history={browserHistory}>
      {AppRoutes}
    </Router>,
  document.getElementById('app')
);
