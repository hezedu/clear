import { Component } from 'react';
export class AsyncRoute extends Component {
  render(){
    return (<div>
      <h1>{this.props.title}</h1>
      <p>动态路由路由可以和<b>react-hot-load</b>配合。</p>
      </div>);
  }
}