import { Component } from 'react';
const indexHtml = require('./index.html');
//export const Index = () => <div dangerouslySetInnerHTML={{__html:indexHtml}}/>;
export class HotLoad extends Component {
  render(){
    return (<div dangerouslySetInnerHTML={{__html:indexHtml}}/>);
  }
}

export class Async extends Component {
  render(){
    return (<div dangerouslySetInnerHTML={{__html:indexHtml}}/>);
  }
}

export const dynamicRouting = {
  path: 'dynamic_routing',
  getComponents: function(nextState, callback) {
    require(['./dynamic_routing.jsx'], function (cmpt) {
      callback(null, cmpt);
    });
  },
  title: '动态路由'
};
