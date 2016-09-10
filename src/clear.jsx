import ReactDOM, {findDOMNode} from 'react-dom';
import { Component, PropTypes} from 'react';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import { createStore } from 'redux';
const clear = {
  Component,
  PropTypes,
  createStore,
  findDOMNode,
  pick(key, obj) {
    this[key] = obj[key];
  }
};

// clear.pick('findDOMNode', ReactDOM);
// clear.pick('Component', React);
// clear.pick('PropTypes', React);

const mount = document.getElementById('app');
clear.BASE_URL = mount.getAttribute('base-url') || '';
clear.BASE_STATIC = mount.getAttribute('base-static') || '';//静态文件path.

const history = useRouterHistory(createHashHistory)({queryKey: false});
import AppRoutes from './router.conf';

ReactDOM.render(
  <Router history={history} routes={AppRoutes} baseUrl={clear.BASE_URL} />,
  mount
);
